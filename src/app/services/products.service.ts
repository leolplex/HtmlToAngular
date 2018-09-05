import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loading = true;
  products: Product[] = [];
  productsFiltered: Product[] = [];
  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    return new Promise( ( resolve, reject ) => {
      this.http
      .get('https://angular-html-a6da9.firebaseio.com/productos_idx.json')
      .subscribe((resp: Product[]) => {
        this.products = resp;
        this.loading = false;
        resolve();
      });
    });
  }

  getProduct(id: string) {
    return this.http.get(
      `https://angular-html-a6da9.firebaseio.com/productos/${id}.json`
    );
  }

  searchProduct(termino: string) {
    if ( this.products.length === 0 ) {
      // Cargar productos
      this.loadProducts().then( () => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filterProducts(termino);
      } );
    } else {
      // aplicar filtro
      this.filterProducts(termino);
    }

    console.log(this.productsFiltered);
  }

  private filterProducts( termino: string ) {
    termino = termino.toLocaleLowerCase();
    this.productsFiltered = [];

    this.products.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productsFiltered.push(prod);
      }
    });
  }
}
