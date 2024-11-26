import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListEditorComponent } from './shopping-list-editor/shopping-list-editor.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ShoppingService} from "./service/shopping.service";
import { ShoppingListViewComponent } from './shopping-list-view/shopping-list-view.component';
import { StoreModule } from '@ngrx/store';
import * as from from './store/shopping.reducer';
import {EffectsModule} from "@ngrx/effects";
import {ShoppingEffects} from "./store/shopping.effects";
import {provideHttpClient} from "@angular/common/http";

export const routes: Routes = [
  {
    path: 'create',
    component: ShoppingListEditorComponent,
    data: {
      title: 'Einkaufsliste anlegen'
    }
  },
  {
    path: 'edit/:id',
    component: ShoppingListEditorComponent,
    data: {
      title: 'Einkaufsliste ändern'
    }
  },
  {
    path: 'view',
    component: ShoppingListViewComponent
  }
]

@NgModule({
  declarations: [
    ShoppingListEditorComponent,
    ShoppingListViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature(from.FeatureKey, from.shoppingReducer),
    EffectsModule.forFeature([ShoppingEffects])
  ],
  providers: [
    ShoppingService,
    provideHttpClient()
  ]
})
export class ShoppingModule { }
