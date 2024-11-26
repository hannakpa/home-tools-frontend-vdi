import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ShoppingActions} from "./action.types";
import {ShoppingService} from "../service/shopping.service";
import {concatMap, map} from "rxjs";
import {allShoppingListsLoaded} from "./shopping.actions";

@Injectable()
export class ShoppingEffects {
  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService
  ) {
  }

  loadShoppingLists$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ShoppingActions.loadAllShoppingListsForUser),
        concatMap(action =>
          this.shoppingService.getAllShoppingListsForUser(action.username)),
        map(shoppingLists => allShoppingListsLoaded({shoppingLists}))
      )
  )

  saveShoppingList$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ShoppingActions.shoppingListUpdated),
        concatMap(action => this.shoppingService.updateShoppingList(action.update.changes))
      ), {dispatch: false}
  )

  deleteShoppingList$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ShoppingActions.shoppingListDeleted),
        concatMap(action =>
          this.shoppingService.deleteShoppingListById(action.id)
        )
      ), {dispatch: false}
  )
}
