import {createReducer, on} from '@ngrx/store';
import {ShoppingListEntry} from "../model/ShoppingListEntry";
import {ShoppingActions} from "./action.types";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export const FeatureKey = 'shopping';

export interface ShoppingState extends EntityState<ShoppingListEntry> {
  allShoppingListsLoaded: boolean
}

export const adapter = createEntityAdapter<ShoppingListEntry>()

export const initialShoppingState = adapter.getInitialState({
  allShoppingListsLoaded: false
});

export const shoppingReducer = createReducer(
  initialShoppingState,

  on(ShoppingActions.allShoppingListsLoaded,
    (state, action) =>
      adapter.setAll(
        action.shoppingLists,
        {
          ...state,
          allShoppingListsLoaded: true
        })),

  on(ShoppingActions.shoppingListUpdated,
    (state, action) =>
      adapter.updateOne(action.update, state)
  ),

  on(ShoppingActions.shoppingListDeleted,
    (state, action) =>
      adapter.removeOne(action.id, state)
  )
)

export const {
  selectAll
} = adapter.getSelectors()
