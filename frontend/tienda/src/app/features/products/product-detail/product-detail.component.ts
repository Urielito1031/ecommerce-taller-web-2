import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/model/product.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [ButtonComponent,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(){
    this.addToCart.emit(this.product);
  }

 
}
