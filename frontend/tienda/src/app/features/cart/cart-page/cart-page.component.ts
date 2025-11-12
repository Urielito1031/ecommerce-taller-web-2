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
    this.carritoService.incrementarCantidad(productoId);

  }

  decrementarCantidad(productoId: number): void {
    this.carritoService.decrementarCantidad(productoId);

  }

  eliminarItem(productoId: number): void {
    this.carritoService.removerProductoDelCarrito(productoId);
  }

}
