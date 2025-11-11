import { Component, input, output } from '@angular/core';
import { CarritoItem } from '../../../core/model/carrito.model';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  item = input.required<CarritoItem>();

  incrementarCantidad = output<number>(); 
  decrementarCantidad = output<number>(); 
  eliminarItem = output<number>();

  onIncrement(): void {
    this.incrementarCantidad.emit(this.item().productoId);
  }

  onDecrement(): void {
    if (this.item().cantidad > 1) {
      this.decrementarCantidad.emit(this.item().productoId);
    }
  }

  onRemove(): void {
    this.eliminarItem.emit(this.item().productoId);
  }
}
