import { Component } from '@angular/core';
import { ProductListComponent } from '../../../features/products/product-list/product-list.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
