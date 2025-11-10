import { computed, Injectable, signal } from '@angular/core';
import { CarritoConItemsYTotalDto, CarritoItem } from '../model/carrito.model';
import { AuthStateService } from './auth.state.service';
import { CartService } from '../../features/cart/cart.service';
import { finalize } from 'rxjs';

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

  constructor(private authState: AuthStateService, private cartApi: CartService) {}

  // Carga el carrito del usuario desde el backend
  loadCart(usuarioId?: number) {
    const uid = usuarioId ?? this.authState.user()?.id;
    if (!uid) { return; }
    this._loading.set(true);
    this._error.set(null);
    this.cartApi.obtenerCarritoDeUsuario(uid)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: dto => this._carrito.set(dto),
        error: err => this._error.set(err?.message ?? 'Error al cargar carrito')
      });
  }

  resetError() { this._error.set(null); }
}
