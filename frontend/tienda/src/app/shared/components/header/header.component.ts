import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ProductFilterComponent } from '../../../features/products/product-filter/product-filter.component';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { CarritoStateService } from '../../../core/services/carrito.state.service';
import { filter } from 'rxjs/internal/operators/filter';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SearchComponent, RouterLink, RouterLinkActive, ProductFilterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authState = inject(AuthStateService);
  private carritoState = inject(CarritoStateService);
  private router = inject(Router);


  private urlActual = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    {initialValue: this.router.url}
  );

   esCarrito = computed(() =>{ 
    const urlActual = this.urlActual();
    console.log("Current URL:", urlActual);  
   return urlActual.includes('/cart')
  }
  );
  
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
