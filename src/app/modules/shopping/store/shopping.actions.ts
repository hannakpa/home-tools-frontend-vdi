import {createAction, props} from "@ngrx/store";
import {ShoppingListEntry} from "../model/ShoppingListEntry";
import {Update} from "@ngrx/entity";

export const loadAllShoppingListsForUser = createAction(
  "[ShoppingList View Component] Load All ShoppingLists",
  props<{username: string}>()
)

export const allShoppingListsLoaded = createAction(
  "[Load ShoppingLists Effect] All ShoppingLists Loaded",
  props<{shoppingLists: ShoppingListEntry[]}>()
)

export const shoppingListUpdated = createAction(
  "[Edit ShoppingList Component] ShoppingList Updated",
  props<{update: Update<ShoppingListEntry>}>()
)

export const shoppingListDeleted = createAction(
  "[ShoppingList View Component] ShoppingList Deleted",
  props<{id: number}>()
)
