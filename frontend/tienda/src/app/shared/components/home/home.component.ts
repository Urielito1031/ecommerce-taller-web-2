import { Component } from '@angular/core';
import { ProductListComponent } from '../../../features/products/product-list/product-list.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserListComponent } from '../../../features/users/user-list/user-list.component';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent,HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
