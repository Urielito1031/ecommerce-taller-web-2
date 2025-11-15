import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { ProductStateService } from '../../../core/services/product.state.service';
import { CategoriaStateService } from '../../../core/services/categoria.state.service';
import { ProductCrear } from '../../../core/model/product.model';
import { TextoCategoriaPipe } from '../../../shared/pipes/categoria.pipe';
import { ProductoCrearDto } from '../../../../../../../backend/src/dtos/product/productoCrearDto';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextoCategoriaPipe
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  private productService = inject(ProductStateService);
  private categoriaService = inject(CategoriaStateService);
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
 
  private _error = signal<string | null>(null);
  private _mensajeExito = signal<string | null>(null);
  private _loading = signal<boolean>(false);
  private _imagePreview = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly categorias = this.categoriaService.categorias;
  readonly mensajeExito = this._mensajeExito.asReadonly();
  readonly error = this._error.asReadonly();
  readonly imagePreview = this._imagePreview.asReadonly();
  
  productForm!: FormGroup;
  selectedFileName: string | null = null;

  ngOnInit(): void {
    this.categoriaService.cargarCategorias();

    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      categoriaId: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      imagenFile: [null, [Validators.required]],  // Para validación
      stock: [1, [Validators.required, Validators.min(1), Validators.max(9999)]]
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
     
      
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this._error.set('La imagen es muy grande. Tamaño máximo: 5MB');
        this.clearImage();
        return;
      }
      
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const fileName = `producto-${timestamp}.${extension}`;
      
      this.selectedFileName = fileName;

      const imageUrl = `/img/${fileName}`;
      this.productForm.get('imagenUrl')?.setValue(imageUrl);
      
      this.productForm.get('imagenFile')?.setValue(file);
      this._error.set(null);
      
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this._imagePreview.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
     
    }
  }

  clearImage(): void {
    this.selectedFileName = null;
    this.productForm.get('imagenFile')?.setValue(null);
    this._imagePreview.set(null);
    
    const fileInput = document.getElementById('imagenFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }


  onSubmit(): void {
    this._error.set(null);
    this._mensajeExito.set(null);

    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      this._error.set('Por favor, completa todos los campos correctamente');
      return;
    }

    if (!this.selectedFileName) {
      this._error.set('Debes seleccionar una imagen');
      return;
    }

    const formValue = this.productForm.getRawValue();
    
    const formData = new FormData();
  formData.append('nombre', formValue.nombre);
  formData.append('descripcion', formValue.descripcion);
  formData.append('categoriaId', formValue.categoriaId);
  formData.append('precio', formValue.precio);
  formData.append('stock', formValue.stock);
  formData.append('imagenFile', formValue.imagenFile);  
  console.log('📤 Enviando al backend:', formData);

    this._loading.set(true);

   
    this.productService.crearProducto(formData)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (productoCreado) => {
          console.log('✅ Producto creado:', productoCreado);
          //aca deberia enviar la imagen al servidor de archivos
           this._mensajeExito.set(`Producto "${productoCreado.nombre}" creado exitosamente`);
          
          alert(`✅ Producto creado con éxito!`);
          
          this.productForm.reset({ categoriaId: 0, precio: 0, stock: 1 });
          this.clearImage();
          
          setTimeout(() => {
            this.router.navigate(['/productos']);
          }, 3000);
        },
        error: (err) => {
          console.error('❌ Error creando producto:', err);
          this._error.set(err.error?.message || err.message || 'Error al crear producto');
        }
      });
  }


  getError(field: string): string | null {
    const control = this.productForm.get(field);
    if (!control || !control.touched) return null;
    
    if (control.hasError('required')) {
      if (field === 'imagenFile') return 'Debes seleccionar una imagen';
      return 'Este campo es obligatorio';
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (control.hasError('min')) {
      const min = control.getError('min').min;
      return `Valor mínimo: ${min}`;
    }
    if (control.hasError('max')) {
      const max = control.getError('max').max;
      return `Valor máximo: ${max}`;
    }
    
    return null;
  }

  onCancel(): void {
    this.router.navigate(['/productos']);
  }
}