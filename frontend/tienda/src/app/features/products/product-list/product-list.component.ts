import { Component, computed, inject, signal } from '@angular/core';
import { Product } from '../../../core/model/product.model';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { SearchService } from '../../../core/services/search.state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {  } from '@angular/common'; 

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
    private productService = inject(ProductService);
    private cartService = inject(CartService);
    private searchService = inject(SearchService);


    
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
  

  constructor() {}

  filteredProducts = computed(() => {
    const term = this.searchService.query().toLowerCase();

    const products = this.products()!; 
    
    if (!term) return products;
    return products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}