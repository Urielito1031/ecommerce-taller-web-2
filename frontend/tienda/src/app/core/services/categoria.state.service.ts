import { inject, Injectable, Signal, signal } from '@angular/core';
import { CategoriaService } from '../../features/categoria/categoria.service';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaStateService {


  private categoriaService = inject(CategoriaService);

  private _categorias = signal<Categoria[]>([]); 
  
  readonly categorias: Signal<Categoria[]> = this._categorias.asReadonly();

  cargarCategorias(): void { 
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this._categorias.set(categorias);
      },
      error: (err: any) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

}
