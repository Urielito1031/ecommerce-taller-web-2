import { computed, inject, Injectable, Output, signal } from '@angular/core';
import { Product, ProductoConCantidad } from '../../core/model/product.model';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment.development';
import { CarritoConItemsYTotalDto } from '../../core/model/carrito.model';
import { AuthStateService } from '../../core/services/auth.state.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService {
  

  constructor() {
    super();
    this.baseUrl = environment.apiNodeBaseUrl;
  }
  
  private readonly _items = signal<Product[]>([]);
  
  readonly totalItems = computed(()=> this._items().length);
  
  get items(){
    return this._items.asReadonly();
  }

  obtenerCarritoDeUsuario(usuarioId: number) {

    const respuesta = this.get<CarritoConItemsYTotalDto>(`carrito/${usuarioId}`);
    console.log("Respuesta del carrito:", respuesta);
    return respuesta;
  };

agregarProductoACarrito(usuarioId: number, productId: number, cantidad: number = 1) {
  console.log(`Agregando producto ${productId} al carrito del usuario ${usuarioId}`);
  return this.post<ProductoConCantidad>(
    `carrito/agregar/${usuarioId}`,  
    { productoId: productId, cantidad }
  );
}
 
  addToCart(product: Product, cantidad = 1) {
    console.log("Agregando producto al carrito en CartService:", product);
    const currentItems = this._items();
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedItem = { ...currentItems[existingItemIndex] };
      (updatedItem as any).cantidad += cantidad;
      currentItems[existingItemIndex] = updatedItem;
      this._items.set([...currentItems]);
    } else {
      const newItem = { ...product, cantidad };
      this._items.set([...currentItems, newItem]);
    }
  
  
  }


}
