import {Component, OnInit} from '@angular/core';
import {mainMenuTreeConfig} from "../../shared/configuration/main-menu-tree.config";
import {MenuTree} from "../model/MenuTree";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  menuTrees!: MenuTree[];

  ngOnInit(): void {
    this.menuTrees = mainMenuTreeConfig;
  }
}
