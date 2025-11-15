import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../../core/model/categoria.model';

@Pipe({
  name: 'textoCategoria',
  standalone: true
})
export class TextoCategoriaPipe implements PipeTransform {
  transform(value: Categoria | string | null | undefined): string {
    if (!value) {
      return 'Sin Categoría';
    }
    
    let texto: string;
    
    if (typeof value === 'object' && 'nombre' in value) {
      texto = value.nombre;
    } 
    else if (typeof value === 'string') {
      texto = value;
    } 
    else {
      return 'Sin Categoría';
    }
    
    return texto
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }
}