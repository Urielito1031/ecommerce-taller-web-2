// frontend/tienda/src/app/core/services/product.state.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../../features/products/product.service';
import { AuthStateService } from './auth.state.service';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private _products = signal<Product[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _selectedProduct = signal<Product | null>(null);


  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly selectedProduct = this._selectedProduct.asReadonly();

  readonly productsSorted = computed(() => 
    [...this._products()].sort((a, b) => a.nombre.localeCompare(b.nombre))
  );

  readonly productsInStock = computed(() => 
    this._products().filter(p => p.stock > 0)
  );

  private productApi = inject(ProductService);
  private authApi = inject(AuthStateService);
  private router = inject(Router);
  private isLoaded = false; 


  filtrarPorCategoria(categoriaid:number):void {
    if(!this.authApi.isAuthenticated()){
       this.router.navigate(['/auth/login']);
       return;
    }
    

    this._error.set(null);

    this.productApi.filtrarPorCategoria(categoriaid).subscribe({
      next: productosFiltrados => {
        this._products.set(productosFiltrados);
      },
      error: err => {
        this._error.set(err?.message ?? 'Error al filtrar productos por categoría');
        this._loading.set(false);
      }
    });




  }

  loadProducts(force = false): void {
    if (this.isLoaded && !force) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.productApi.getProducts()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: products => {
          this._products.set(products);
          this.isLoaded = true;
        },
        error: err => {
          this._error.set(err?.message ?? 'Error al cargar productos');
        }
      });
  }

  // agregarNuevoProducto(producto: Product): void {

  // }




  loadProductById(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.productApi.getProductById(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: product => {
          this._selectedProduct.set(product);
          
          const products = this._products();
          const index = products.findIndex(p => p.id === id);
          if (index !== -1) {
            const updated = [...products];
            updated[index] = product;
            this._products.set(updated);
          }
        },
        error: err => {
          this._error.set(err?.message ?? 'Error al cargar producto');
        }
      });
  }

  searchProducts(term: string): Product[] {
    const lowerTerm = term.toLowerCase();
    return this._products().filter(p =>
      p.nombre.toLowerCase().includes(lowerTerm) ||
      p.descripcion.toLowerCase().includes(lowerTerm)
    );
  }

  resetError(): void {
    this._error.set(null);
  }
}