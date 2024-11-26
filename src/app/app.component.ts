import { Component } from '@angular/core';
import {MenuTree} from "./modules/navigation/model/MenuTree";
import {mainMenuTreeConfig} from "./modules/shared/configuration/main-menu-tree.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'home-tools-frontend';
  menuTrees: MenuTree[];

  constructor() {
    this.menuTrees = mainMenuTreeConfig;
  }
}
