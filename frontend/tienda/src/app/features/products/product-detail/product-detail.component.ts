import { Component, input, output } from '@angular/core';
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

  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart(){
    this.addToCart.emit(this.product());
  }

 
}
