import { Component, inject, Signal } from '@angular/core';
import { CarritoStateService } from '../../../core/services/carrito.state.service';
import { CarritoConItemsYTotalDto, CarritoItem } from '../../../core/model/carrito.model';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart-page',
  imports: [CartItemComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  carritoService = inject(CarritoStateService);

 carrito: Signal<CarritoConItemsYTotalDto| null> = this.carritoService.carrito;     
  items:Signal<CarritoItem[]> = this.carritoService.items;         
  total: Signal<number> = this.carritoService.total;      
  loading: Signal<boolean> = this.carritoService.loading;    
  error: Signal<string | null> = this.carritoService.error;      

  
  ngOnInit(){
    console.log("Cargando carrito en CartPageComponent");
    this.carritoService.loadCart();
  }

  // Métodos para manejar los eventos emitidos por cart-item
  incrementarCantidad(productoId: number): void {
    console.log('Incrementar cantidad del producto:', productoId);
    // TODO: Implementar la lógica para incrementar la cantidad
    // this.carritoService.incrementQuantity(productoId);
  }

  decrementarCantidad(productoId: number): void {
    console.log('Decrementar cantidad del producto:', productoId);
    // TODO: Implementar la lógica para decrementar la cantidad
    // this.carritoService.decrementQuantity(productoId);
  }

  eliminarItem(productoId: number): void {
    console.log('Eliminar producto del carrito:', productoId);
    // TODO: Implementar la lógica para eliminar el producto
    // this.carritoService.removeItem(productoId);
  }

}
