import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStateService } from './core/services/auth.state.service';
import { CarritoStateService } from './core/services/carrito.state.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tienda';
  private authState = inject(AuthStateService);
  private carritoState = inject(CarritoStateService);
  
  constructor(private router: Router) {
    // Cargar carrito automáticamente cuando el usuario se autentica
    effect(() => {
      const user = this.authState.user();
      if (user?.id) {
        this.carritoState.loadCart(user.id);
      }
    });
  }

  get ocultarHeader() {
    const url = this.router.url;
    return url.startsWith('/auth/login') || url.startsWith('/auth/register');
  }
}
