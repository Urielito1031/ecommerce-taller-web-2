import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../../core/model/product.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CarritoStateService } from '../../../core/services/carrito.state.service';
import { TextoCategoriaPipe } from '../../../shared/pipes/categoria.pipe';

@Component({
  selector: 'app-product-detail',
  imports: [ButtonComponent,CommonModule,TextoCategoriaPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product = input.required<Product>();
  addToCart = output<Product>();

  private carritoService = inject(CarritoStateService);

  cantidadEnCarrito = computed(() => {
    const items = this.carritoService.items();
    const itemEnCarrito = items.find(i => i.productoId === this.product().id);
    return itemEnCarrito?.cantidad || 0;
  });

  //visual en angular, el backend no actualiza el stock hasta no concretar venta
  stockDisponible = computed(() => {
    const stockOriginal = this.product().stock;
    const enCarrito = this.cantidadEnCarrito();
    return stockOriginal - enCarrito;
  });

  //flag de boolean para cambiar la UI
  sinStock = computed(() => { return this.stockDisponible() <= 0; });
  pocasUnidades = computed(() => { 
    return this.stockDisponible() > 1
     && this.stockDisponible() <= 3; });

  unaUnidad = computed(() => { return this.stockDisponible() === 1; });
  


  onAddToCart(){
    this.addToCart.emit(this.product());
  }

 
}
