import { computed, inject, Injectable, signal } from '@angular/core';
import { CarritoConItemsYTotalDto, CarritoItem } from '../model/carrito.model';
import { AuthStateService } from './auth.state.service';
import { CartService } from '../../features/cart/cart.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CarritoStateService {

  
  private _carrito = signal<CarritoConItemsYTotalDto | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly carrito = this._carrito.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly items = computed<CarritoItem[]>(() => this._carrito()?.items ?? []);
  readonly total = computed<number>(() => this._carrito()?.total ?? 0);


  private authState = inject(AuthStateService);
  private carritoApi = inject(CartService);

  actualizarCantidad(productoId: number, nuevaCantidad: number): void {
    const uid = this.authState.user()?.id;
    if (!uid) {
      this._error.set('Usuario no autenticado');
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    this.carritoApi
      .actualizarCantidadDeUnProducto(uid, productoId, nuevaCantidad)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (carritoActualizado) => this._carrito.set(carritoActualizado),
        error: (err: HttpErrorResponse) =>{
          const backendError = err.error?.message;
          this._error.set(backendError);
        }
         
      });
  }

  agregarProductoACarrito(productoId: number, cantidad: number = 1): void {
    const uid = this.authState.user()?.id;
    if (!uid) {
      this._error.set('Usuario no autenticado');
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    this.carritoApi
      .agregarProducto(uid, productoId, cantidad)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (dto) => this._carrito.set(dto),
        error: (err: HttpErrorResponse) => {
          const backendError = err.error?.message ||
           'Error al agregar producto al carrito';
           console.error(backendError);
          this._error.set(backendError);
        }
      });
  }
  removerProductoDelCarrito(productoId: number): void {
    const uid = this.authState.user()?.id;
    if (!uid) {
      this._error.set('Usuario no autenticado');
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    this.carritoApi.removerProducto(uid, productoId)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (carritoActualizado) => this._carrito.set(carritoActualizado),
        error: (err) =>
          this._error.set(
            err?.message ?? 'Error al eliminar producto del carrito'
          ),
      });
  }

  limpiarCarrito(): void {
    const uid = this.authState.user()?.id;
    if (!uid) {
      this._error.set('Usuario no autenticado');
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    this.carritoApi.limpiarCarrito(uid)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: () => {
          this._carrito.set({ usuarioId: uid, items: [], total: 0 });
        },
        error: (err) =>
          this._error.set(
            err?.message ?? 'Error al limpiar el carrito'
          ),
      });
  }

  resetError() {
    this._error.set(null);
  }
  // Carga el carrito del usuario desde el backend
  loadCart(usuarioId?: number) {
    const uid = usuarioId ?? this.authState.user()?.id;
    if (!uid) {
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    this.carritoApi
      .obtenerCarritoDeUsuario(uid)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (dto) => this._carrito.set(dto),
        error: (err: HttpErrorResponse) =>
          this._error.set(err.error.message ?? 'Error al cargar carrito'),
      });
  }

  incrementarCantidad(productoId: number): void {
    const item = this.items().find((i) => i.productoId === productoId);
    if (!item) return;
    this.actualizarCantidad(productoId, item.cantidad + 1);
  }
  decrementarCantidad(productoId: number): void {
    const item = this.items().find((i) => i.productoId === productoId);
    if (!item || item.cantidad <= 1) return;
    this.actualizarCantidad(productoId, item.cantidad - 1);
  }
}
