import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {NavigationModule} from "./modules/navigation/navigation.module";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/navigation/navigation.module').then(m => m.NavigationModule),
  },
  {
    path: 'shoppingLists',
    loadChildren: () => import('./modules/shopping/shopping.module').then(m => m.ShoppingModule),
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NavigationModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
    EffectsModule.forRoot([])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
