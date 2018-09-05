import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loading = true;
  products: Product[] = [];
  constructor(private http: HttpClient) {
    this.getProducts();
  }

  private getProducts() {
    this.http
      .get('https://angular-html-a6da9.firebaseio.com/productos_idx.json')
      .subscribe((resp: Product[]) => {
        console.log(resp);
        this.products = resp;
        this.loading = false;
      });
  }
}
