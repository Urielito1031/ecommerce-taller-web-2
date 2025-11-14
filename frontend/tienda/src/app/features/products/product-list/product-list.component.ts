// frontend/tienda/src/app/features/products/product-list/product-list.component.ts
import { Component, computed, inject } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SearchService } from '../../../core/services/search.state.service';
import { CarritoStateService } from '../../../core/services/carrito.state.service';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { ProductStateService } from '../../../core/services/product.state.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/model/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productState = inject(ProductStateService);
  private carritoState = inject(CarritoStateService);
  private auth = inject(AuthStateService);
  private router = inject(Router);
  private searchService = inject(SearchService);

  

  products = this.productState.products;
  loading = this.productState.loading;
  error = this.productState.error;

  filteredProducts = computed(() => {
    const term = this.searchService.query().toLowerCase();
    const products = this.products();

    if (!term) return products;
    
    return products.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term)
    );
  });

  ngOnInit() {
    this.productState.loadProducts();
  }

  addToCart(product: Product, cantidad = 1) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    
    this.carritoState.agregarProductoACarrito(product.id, cantidad);
  }
}