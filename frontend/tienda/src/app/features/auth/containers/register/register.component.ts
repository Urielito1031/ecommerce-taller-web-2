// frontend/tienda/src/app/features/auth/containers/register/register.component.ts
import { Component, computed, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthStateService } from '../../../../core/services/auth.state.service';
import { LoginCredentials, RegisterData } from '../../../../core/model/credentials.model';

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
  textoAuthLink = '¿Ya tienes una cuenta? Inicia sesión aquí.';
  authLink = '/auth/login';

  private authState = inject(AuthStateService);
  private router = inject(Router);
  
  serverError = computed(() => this.authState.error());
  loading = computed(() => this.authState.loading());
  
  private registroExitoso = false;

  constructor() {
    this.authState.setError(null);

    effect(() => {
      const loading = this.authState.loading();
      const error = this.authState.error();
      
      if (!loading && !error && this.registroExitoso) {
        this.router.navigate(['/auth/login']);
        this.registroExitoso = false; 
      }
    });
  }

  onSubmit(data: LoginCredentials | RegisterData): void {
    if ('firstName' in data) {
      this.registroExitoso = true;
      this.authState.register(data);
    }
  }
}