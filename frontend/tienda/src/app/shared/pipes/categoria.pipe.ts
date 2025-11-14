import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../../core/model/categoria.model';

@Pipe({
  name: 'textoCategoria',
  standalone: true
})
export class TextoCategoriaPipe implements PipeTransform {
  transform(value: Categoria | string | null | undefined): string {
    // Maneja diferentes casos
    if (!value) {
      return 'Sin categoría';
    }
    
    // Si es un objeto Categoria
    if (typeof value === 'object' && 'nombre' in value) {
      return value.nombre.toLowerCase();
    }
    
    // Si es un string (por compatibilidad)
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    
    return 'Sin categoría';
  }
}