import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {User} from "../../shared/model/User";
import {FormMode} from "../model/FormMode";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ArrayValidators} from "../../shared/validators/array.validator";
import {ShoppingService} from "../service/shopping.service";
import {ShoppingListEntry} from "../model/ShoppingListEntry";
import {DarkModeService} from "../../shared/service/dark-mode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingItem} from "../model/ShoppingItem";
import {Store} from "@ngrx/store";
import {ShoppingState} from "../store/shopping.reducer";
import {shoppingListUpdated} from "../store/shopping.actions";
import {Update} from "@ngrx/entity";
import {filter, of, Subject, Subscription, switchMap, tap} from "rxjs";
import {Selectable} from "../../shared/model/Selectable";

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css']
})
export class ShoppingListEditorComponent implements OnInit, OnDestroy {

  activatedRouteSubscription$: Subscription | undefined
  allUsersSubscription$: Subscription | undefined
  shoppingListSubscription$: Subscription | undefined

  selectableUsers!: User[];
  selectableUsersLoadedSubject = new Subject<boolean>();

  pageTitle?: string

  preSelectedOptions: User[] = []
  preSelectedDatepickerValue?: Date;
  shoppingListId?: number;

  @ViewChild('shoppingItemsScrollContainer')
  shoppingItemsScrollContainer!: ElementRef;

  //for enum to work
  protected readonly shoppingItemDialogMode = FormMode;
  private currentIndexToEdit!: number;

  showItemAddDialog = false;
  dialogMode!: FormMode;
  finishedFlag = false;
  showSaveLoadingSpinner = false;

  shoppingItemForm = this.createShoppingItemForm()

  shoppingListForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    dueDate: [new Date, Validators.required],
    creationDate: [new Date],
    entitledUsernames: this.formBuilder.array([], [ArrayValidators.minSelected(1)]),
    shoppingItems: this.formBuilder.array([])
  })

  isCollapsed = false;

  constructor(
    private formBuilder: FormBuilder,
    private shoppingService: ShoppingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private shoppingStore: Store<ShoppingState>,
    public darkModeService: DarkModeService) {
  }

  ngOnInit(): void {
    this.pageTitle = this.activatedRoute.snapshot.data['title'];

    this.activatedRouteSubscription$ = this.activatedRoute.params.subscribe(params => {
      this.shoppingListId = params['id']
    })

    // Static list of users
    this.selectableUsers = [
      {
        id: "1",
        username: 'utz123',
        firstName: 'Utz',
        email: 'utz@shoppinglist.com',
        displayName: "Utz"
      },
      {
        id: "2",
        username: 'andre123',
        firstName: 'Andre',
        email: 'andre@shoppinglist.com',
        displayName: "Andre"
      }
    ];

    this.allUsersSubscription$ = of(this.selectableUsers).pipe(
      tap((users) => {
        this.selectableUsers = users;
        this.selectableUsers.forEach(selectableUser => {
          selectableUser.displayName = selectableUser.firstName
        })
        this.selectableUsersLoadedSubject.next(true)
      }),
      filter(() => !!this.shoppingListId),
      switchMap(() => this.shoppingService.getShoppingListById(this.shoppingListId!))
    ).subscribe(shoppingListEntry => {
      this.shoppingListForm.patchValue({
        id: shoppingListEntry.id,
        name: shoppingListEntry.name,
        dueDate: new Date(shoppingListEntry.dueDate),
      });

      this.preSelectedDatepickerValue = new Date(shoppingListEntry.dueDate)

      // set entiteled users for component
      this.preSelectedOptions = this.selectableUsers.filter(user => shoppingListEntry.entitledUsernames.includes(user.username))
      this.addEntitledUsernames(this.preSelectedOptions);

      // set shopping items
      this.addShoppingItems(shoppingListEntry.shoppingItems);
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription$?.unsubscribe();
    this.allUsersSubscription$?.unsubscribe();
    this.shoppingListSubscription$?.unsubscribe();
  }

  get shoppingItemEntries() {
    return this.shoppingListForm.get('shoppingItems') as FormArray
  }

  get entitledUsers() {
    return this.shoppingListForm.get('entitledUsernames') as FormArray
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  addShoppingItems(shoppingListItems: ShoppingItem[]) {
    shoppingListItems.forEach(shoppingListItem => {
      this.shoppingItemEntries.push(this.formBuilder.group(shoppingListItem))
    })
  }

  changeSelectedDate(selectedDate: Date) {
    this.shoppingListForm.controls.dueDate.setValue(selectedDate);
  }

  addEntitledUsernames(selectedOptions: Selectable[]) {
    this.entitledUsers.clear()

    selectedOptions.forEach(selectedOption => {
      const userToAdd = this.selectableUsers.find((user) => user.id === selectedOption.id)

      if (userToAdd) {
        this.entitledUsers.push(this.formBuilder.control(userToAdd?.username))
      }
    })

    this.shoppingListForm.updateValueAndValidity()
  }

  markMultiSelectAsTouched() {
    this.shoppingListForm.controls.entitledUsernames.markAsTouched()
  }

  createShoppingItemForm() {
    return this.formBuilder.group({
      articleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      quantity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      comment: ['', [Validators.maxLength(120)]]
    })
  }

  isShoppingListFormInvalid(fieldName: string, validationType?: string) {
    const targetField = this.shoppingListForm.get(fieldName) as FormControl;
    return this.checkForFieldValidity(validationType, targetField);
  }

  isShoppingItemFormInvalid(fieldName: string, validationType?: string) {
    const targetField = this.shoppingItemForm.get(fieldName) as FormControl;
    return this.checkForFieldValidity(validationType, targetField);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkForFieldValidity(validationType: string | undefined, targetField: FormControl<any>) {

    if (validationType) {
      return (targetField?.hasError(validationType) && targetField?.touched)
    }

    return (targetField?.invalid && targetField?.touched)
  }

  addEntryToShoppingList(): void {
    this.shoppingItemEntries.push(this.shoppingItemForm)
    this.showItemAddDialog = false;
  }

  editEntry() {
    if (this.shoppingItemForm.valid) {
      this.shoppingItemEntries.at(this.currentIndexToEdit).patchValue(this.shoppingItemForm.value)
      this.currentIndexToEdit = 0;
      this.showItemAddDialog = false;
    }
  }

  removeShoppingItem(index: number) {
    this.shoppingItemEntries.removeAt(index)
  }

  openShoppingItemEditDialog(index: number) {
    this.shoppingItemForm = this.createShoppingItemForm()

    this.showItemAddDialog = true;
    this.dialogMode = FormMode.EDIT;
    this.currentIndexToEdit = index
    this.shoppingItemForm.setValue(this.shoppingItemEntries.at(index).value)
  }

 showPriceShoppingItem(shoppingItemEntry: AbstractControl) {
   const group = shoppingItemEntry as FormGroup;
   const productName = group.get('articleName')?.value
   console.log("The product is:", productName);
   //pass the name to the service --> add name to http
   //substitute tag icon with price

  }

  openAddEntryDialog() {
    this.shoppingItemForm = this.createShoppingItemForm();

    if (this.isCollapsed) {
      this.toggleCollapse()
    }

    this.showItemAddDialog = !this.showItemAddDialog;
    this.dialogMode = FormMode.ADD
  }

  closeShoppingListEntryAddDialog() {
    this.showItemAddDialog = !this.showItemAddDialog;
  }

  submitShoppingList() {
    if (this.shoppingListForm.valid) {
      const shoppingListEntry: ShoppingListEntry = {...this.shoppingListForm.value as ShoppingListEntry, finishedFlag: this.finishedFlag};

      if (this.shoppingListId) {
        const update: Update<ShoppingListEntry> = {
          id: shoppingListEntry.id,
          changes: shoppingListEntry
        }

        this.shoppingStore.dispatch(shoppingListUpdated({update}))

        this.navigateToShoppingListViewOnActiveFinishedFlag(shoppingListEntry.id)
      } else {
        this.showSaveLoadingSpinner = true;

        this.shoppingService.saveShoppingList(shoppingListEntry).subscribe({
          next: (shoppingItems: ShoppingListEntry) => {
            this.shoppingListForm.patchValue(shoppingItems)
            this.navigateToShoppingListViewOnActiveFinishedFlag(shoppingItems.id)
            this.showSaveLoadingSpinner = false;
          },
          error: (error) => {
            console.log(error)
            this.showSaveLoadingSpinner = false;
          }
        })
      }
    }
  }

  navigateToShoppingListViewOnActiveFinishedFlag(id: number) {
    if(this.finishedFlag) {
      this.router.navigate(['/shoppingLists/view'])
    } else {
      this.router.navigate(['/shoppingLists/edit', id])
    }
  }

  setFinishedFlag(flag: boolean) {
    this.finishedFlag = flag
  }

  protected readonly FormGroup = FormGroup;
}
