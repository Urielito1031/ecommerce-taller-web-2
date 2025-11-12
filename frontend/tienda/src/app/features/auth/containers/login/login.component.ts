// frontend/tienda/src/app/features/auth/containers/login/login.component.ts
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthStateService } from '../../../../core/services/auth.state.service';
import { LoginCredentials } from '../../../../core/model/credentials.model';
import { effect } from '@angular/core';

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
  private router = inject(Router);

  serverError = computed(() => this.authState.error());
  loading = computed(() => this.authState.loading());

  constructor() {
    this.authState.setError(null);

    effect(() => {
      if (this.authState.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });
  }

  onLoginSubmit(data: LoginCredentials) {
    this.authState.login(data);
  }
}