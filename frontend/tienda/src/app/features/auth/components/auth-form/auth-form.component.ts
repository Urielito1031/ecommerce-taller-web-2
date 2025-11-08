import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginCredentials, RegisterData } from '../../../../core/model/credentials.model';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  @Input() isRegisterMode: boolean = false;
  @Input() submitButtonText: string = 'Enviar';
  @Input() authTitle: string = '';
  @Input() serverError: string | null = null;
  @Output() formSubmit = new EventEmitter<LoginCredentials | RegisterData>();
  
  private fb = inject(NonNullableFormBuilder);
  authForm!: FormGroup;
  
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', this.isRegisterMode ? [Validators.required] : []],
      lastName: ['', this.isRegisterMode ? [Validators.required] : []],
      address: ['', this.isRegisterMode ? [Validators.required] : []],
    });
  }
  
  onSubmit(): void {
    if (!this.authForm.valid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const formValue = this.authForm.value;
    
    if (this.isRegisterMode) {
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
