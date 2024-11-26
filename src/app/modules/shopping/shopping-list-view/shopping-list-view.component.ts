import {Component, OnInit} from '@angular/core';
import {DarkModeService} from "../../shared/service/dark-mode.service";
import {filter, finalize, first, Observable, tap} from "rxjs";
import {ShoppingListEntry} from "../model/ShoppingListEntry";
import {select, Store} from "@ngrx/store";
import {ShoppingActions} from "../store/action.types";
import {areShoppingListsLoaded, selectAllShoppingLists} from "../store/shopping.selectors";
import {ShoppingState} from "../store/shopping.reducer";

@Component({
  selector: 'app-shopping-list-view',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.css']
})
export class ShoppingListViewComponent implements OnInit {

  shoppingLists$?: Observable<ShoppingListEntry[]>

  loading = false

  constructor(
    private shoppingStore: Store<ShoppingState>,
    public darkModeService: DarkModeService) {
  }

  ngOnInit(): void {
    this.shoppingStore.pipe(
      select(areShoppingListsLoaded),
      tap((shoppingListsLoaded) => {
        if (!this.loading && !shoppingListsLoaded) {
            this.loading = true;
            this.shoppingStore.dispatch(ShoppingActions.loadAllShoppingListsForUser({
              username: 'andre123' // static user name, change for other data
            }));
        }
      }),
      filter((shoppingListsLoaded) => shoppingListsLoaded),
      first(),
      finalize(() => (this.loading = false))
    ).subscribe();

    this.shoppingLists$ = this.shoppingStore.pipe(
      select(selectAllShoppingLists)
    )
  }

  handleDelete(shoppingListId: number, shoppingListName: string) {
    if (confirm("Die Shopping Liste " + shoppingListName + " wirklich dauerhaft löschen?")) {
      this.shoppingStore.dispatch(ShoppingActions.shoppingListDeleted({
        id: shoppingListId
      }))
    }
  }
}
