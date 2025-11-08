import { computed, Injectable, Output, signal } from '@angular/core';
import { Product } from '../../core/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor() { }
  
  private readonly _items = signal<Product[]>([]);
  
  readonly totalItems = computed(()=> this._items().length);
  
  get items(){
    return this._items.asReadonly();
  }

  addToCart(product: Product) {
    this._items.update(items => [...items, product]);
    for(let i of this.items()){

      console.log(i)
    }
    console.log("agregado a carito")
  }


}
