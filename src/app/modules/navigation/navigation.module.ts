import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {RouterModule, Routes} from "@angular/router";
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  }
]

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NavigationModule { }
