import {  Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment.development';
import { CarritoConItemsYTotalDto } from '../../core/model/carrito.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  constructor() {
    super();
    this.baseUrl = environment.apiNodeBaseUrl;
  }

  obtenerCarritoDeUsuario(
    usuarioId: number
  ): Observable<CarritoConItemsYTotalDto> {
    return this.get<CarritoConItemsYTotalDto>(`carrito/${usuarioId}`);
  }

  agregarProducto(
    usuarioId: number,
    productId: number,
    cantidad: number = 1
  ): Observable<CarritoConItemsYTotalDto> {
    return this.post<CarritoConItemsYTotalDto>(`carrito/agregar/${usuarioId}`, {
      productoId: productId,
      cantidad,
    });
  }

  // DELETE http://localhost:4000/api/carrito/1/item/1
  removerProducto(
    usuarioId: number,
    productId: number
  ): Observable<CarritoConItemsYTotalDto> {
    return this.delete<CarritoConItemsYTotalDto>(
      `carrito/${usuarioId}/item/${productId}`
    );
  }

// PUT http://localhost:4000/api/carrito/1/item/1
// Content-Type: application/json

// {
//   "cantidad": 3
// }

  actualizarCantidadDeUnProducto(
    usuarioId: number,
    productoId: number,
    cantidad: number
  ): Observable<CarritoConItemsYTotalDto> {
    return this.put<CarritoConItemsYTotalDto>(
      `carrito/${usuarioId}/item/${productoId}`,
      { cantidad }
    );
  }

  //falta implementar endpoint en el backend
  limpiarCarrito(usuarioId:number):Observable<{ message: string }>{
    return this.delete<{ message: string }>(`carrito/limpiar/${usuarioId}`);
  }

  // addToCart(product: Product, cantidad = 1) {
  //   console.log("Agregando producto al carrito en CartService:", product);
  //   const currentItems = this._items();
  //   const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
  //   if (existingItemIndex !== -1) {
  //     const updatedItem = { ...currentItems[existingItemIndex] };
  //     (updatedItem as any).cantidad += cantidad;
  //     currentItems[existingItemIndex] = updatedItem;
  //     this._items.set([...currentItems]);
  //   } else {
  //     const newItem = { ...product, cantidad };
  //     this._items.set([...currentItems, newItem]);
  //   }
  // }
}
