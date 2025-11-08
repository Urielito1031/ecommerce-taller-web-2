import { Component, computed, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../../../core/model/credentials.model';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../../core/services/auth.state.service';

@Component({
  selector: 'app-login',
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authTitle = 'Login';
  submitButtonText = 'Iniciar Sesión';
  isRegisterMode = false;
  private authState = inject(AuthStateService);
  serverError = computed(() => this.authState.error());

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Limpiar error al entrar en la vista de login
    this.authState.setError(null);
  }

  onLoginSubmit(data: LoginCredentials) {
    this.authService.login(data).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      }
      // El error se maneja y muestra automáticamente por el estado
    });
  }
}
