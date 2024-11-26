import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ShoppingListEntry} from "../model/ShoppingListEntry";
import {map, Observable} from "rxjs";

const API_URL = 'http://localhost:9090';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {


  constructor(private httpClient: HttpClient) { }

  saveShoppingList(shoppingList: ShoppingListEntry): Observable<ShoppingListEntry> {
    return this.httpClient.post<ShoppingListEntry>(API_URL + '/api/shoppingList/create', shoppingList)
  }

  updateShoppingList(shoppingList: Partial<ShoppingListEntry>): Observable<ShoppingListEntry> {
    console.log(JSON.stringify(shoppingList))

    return this.httpClient.post<ShoppingListEntry>(API_URL + '/api/shoppingList/edit', shoppingList)
  }

  getAllShoppingListsForUser(username: string): Observable<ShoppingListEntry[]> {
    return this.httpClient.get<ShoppingListEntry[]>(API_URL + '/api/shoppingList', {
      params: new HttpParams()
        .append('username', username)
    }).pipe(
      map((shoppingListEntries: ShoppingListEntry[]) =>
        shoppingListEntries.sort((a, b) =>
          new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
        )
      )
    )
  }

  getShoppingListById(shoppingListId: number): Observable<ShoppingListEntry> {
    return this.httpClient.get<ShoppingListEntry>(API_URL + '/api/shoppingList/' + shoppingListId)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteShoppingListById(shoppingListId: number): Observable<any> {
    return this.httpClient.delete(API_URL + '/api/shoppingList/delete/' + shoppingListId)
  }
}
