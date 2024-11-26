import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromShoppingLists from './shopping.reducer'
import {ShoppingState} from "./shopping.reducer";

export const selectShoppingState=
  createFeatureSelector<ShoppingState>("shopping")

export const selectAllShoppingLists = createSelector(
  selectShoppingState,
  fromShoppingLists.selectAll
)

export const areShoppingListsLoaded = createSelector(
  selectShoppingState,
  state => state.allShoppingListsLoaded
)
