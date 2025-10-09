import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";


export interface Product {
  id: number;
  title: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:9090/api/products';

  constructor(private http: HttpClient) {}

  getProductByTitle(title: string): Observable<Product> {
    console.log("title:", title);
   return this.http.get<Product>(`${this.apiUrl}/search/${title}`);
  }
}
