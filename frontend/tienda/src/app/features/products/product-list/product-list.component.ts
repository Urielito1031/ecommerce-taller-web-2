import { Component, computed, inject } from '@angular/core';
import { Product } from '../../../core/model/product.model';
import { ProductService } from '../product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SearchService } from '../../../core/services/search.state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarritoStateService } from '../../../core/services/carrito.state.service';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private carritoService = inject(CarritoStateService);
  private auth = inject(AuthStateService);
  private router = inject(Router);
  private searchService = inject(SearchService);

  //parseamos el observable obtenido del service a signal,
  //  para usar reactividad en el componente
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
  constructor() {}

  filteredProducts = computed(() => {
    const term = this.searchService.query().toLowerCase();

    const products = this.products()!;

    if (!term) return products;
    return products.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term)
    );
  });

  addToCart(product: Product, cantidad = 1) {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/auth/login']);
      return;
    }
    this.carritoService.agregarProductoACarrito(product.id, cantidad);

    //esto lo hace el carritoStateService en la linea 47 ahora, pero lo dejo como ejemplo comentado
    // this.carritoService
    //   .agregarProductoACarrito(userId, product.id, cantidad)
    //   .subscribe({
    //     next: (respuesta: any) => {
    //       if (respuesta.message) {
    //         console.warn('Backend dice:', respuesta.message);
    //         return;
    //       }
    //       this.carritoStateService.loadCart(userId);
    //     },
    //     error: (error) => {
    //       console.error('Error HTTP:', error);
    //     },
    //   });
  }
}
