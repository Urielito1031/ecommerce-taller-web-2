import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/cart/cart.service';
import { SearchComponent } from '../search/search.component';
import { AuthStateService } from '../../../core/services/auth.state.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SearchComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authState = inject(AuthStateService);
  private router = inject(Router);
  
  cartService = inject(CartService);
  
  // Exponer signals del estado
  user = this.authState.user;
  isAuthenticated = this.authState.isAuthenticated;

  logout() {
    this.authState.clearAuth();
    this.router.navigate(['/auth/login']);
  }
}
