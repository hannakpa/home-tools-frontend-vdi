import {MenuCategory} from "./MenuCategory";
import {MenuItem} from "./MenuItem";


export interface MenuTree {
  category: MenuCategory;
  menuItems: MenuItem[]
}
