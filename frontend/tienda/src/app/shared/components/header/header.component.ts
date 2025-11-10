import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { CarritoStateService } from '../../../core/services/carrito.state.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SearchComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authState = inject(AuthStateService);
  private carritoState = inject(CarritoStateService);
  private router = inject(Router);
  
  // Exponer signals del estado
  user = this.authState.user;
  isAuthenticated = this.authState.isAuthenticated;
  
  // Total de items en el carrito (suma de cantidades)
  totalItems = computed(() => 
    this.carritoState.items().reduce((acc, item) => acc + item.cantidad, 0)
  );

  logout() {
    this.authState.clearAuth();
    this.router.navigate(['/auth/login']);
  }
}
