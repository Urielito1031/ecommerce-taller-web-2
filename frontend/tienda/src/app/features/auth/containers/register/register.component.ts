import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials, RegisterData } from '../../../../core/model/credentials.model';
import { AuthStateService } from '../../../../core/services/auth.state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  submitButtonText = 'Crear Cuenta';
  isRegisterMode = true;
  authTitle = 'Registro';
  private authState = inject(AuthStateService);
  serverError = computed(() => this.authState.error());

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Limpiar error al entrar en la vista de registro
    this.authState.setError(null);
  }

  onSubmit(data: LoginCredentials | RegisterData): void {
    if ('firstName' in data) {
      this.authService.register(data).subscribe({
        next: () => {
          this.authState.setError(null);
          this.router.navigate(['/auth/login']);
        }
        // El error se maneja y muestra automáticamente por el estado
      });
    }
  }
}
