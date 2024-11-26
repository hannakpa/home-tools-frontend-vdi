import {ShoppingItem} from "./ShoppingItem";

export interface ShoppingListEntry {
  id: number,
  name: string,
  dueDate: Date,
  creationDate: Date,
  entitledUsernames: string[],
  finishedFlag: boolean,
  shoppingItems: ShoppingItem[]
}
