import {MenuTree} from "../../navigation/model/MenuTree";
import {MenuCategory} from "../../navigation/model/MenuCategory";

export const mainMenuTreeConfig: MenuTree[] = [
  {
    category: MenuCategory.SHOPPING,
    menuItems: [
      {
        name: 'Einkaufsliste anlegen',
        routerUrl: '/shoppingLists/create'
      },
      {
        name: 'Einkaufsliste ändern',
        routerUrl: '/shoppingLists/view'
      }
    ]
  }
]
