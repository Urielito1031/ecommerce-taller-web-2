import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginCredentials, RegisterData } from '../../../../core/model/credentials.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {

 
   isRegisterMode = input<boolean>(false);
   submitButtonText = input<string>('Enviar');
   authTitle = input<string>('');
   serverError = input<string | null>(null);
   textoAuthLink = input<string>('');
   authLink = input<string | null>(null);
   formSubmit = output<LoginCredentials | RegisterData>();


  private fb = inject(NonNullableFormBuilder);
  authForm!: FormGroup;
  
  ngOnInit(): void {
        const isRegister = this.isRegisterMode(); 

    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', isRegister ? [Validators.required] : []],
      lastName: ['', isRegister ? [Validators.required] : []],
      address: ['', isRegister ? [Validators.required] : []],
    });
  }
  
  onSubmit(): void {
    if (!this.authForm.valid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const formValue = this.authForm.value;
    
    if (this.isRegisterMode()) {
      const data: RegisterData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
        address: formValue.address
      };
      this.formSubmit.emit(data);
    } else {
      const data: LoginCredentials = {
        email: formValue.email,
        password: formValue.password
      };
      this.formSubmit.emit(data);
    }
  }
  
  getError(field: string): string | null {
    const control = this.authForm.get(field);
    if (!control || !control.touched) return null;
    
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('minlength')) return 'Mínimo 6 caracteres';
    
    return null;
  }
}
