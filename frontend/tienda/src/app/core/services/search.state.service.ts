// frontend/tienda/src/app/core/services/search.state.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Definir la clave del localStorage
  private readonly STORAGE_KEY = 'filtro_busqueda';

  // 1. Cargar el valor inicial desde localStorage al construir el servicio
  private _query = signal<string>(
    localStorage.getItem(this.STORAGE_KEY) || ''
  );

  // Expón la señal como de solo lectura
  query = this._query.asReadonly();
  
  setQuery(term: string) {
    const lowerTerm = term.toLowerCase();
    this._query.set(lowerTerm);
    // 2. Guardar en localStorage
    localStorage.setItem(this.STORAGE_KEY, lowerTerm);
  };
  
  clear() {
    console.log('clear search');
    this._query.set('');
    // 3. Limpiar de localStorage
    localStorage.removeItem(this.STORAGE_KEY);
  }
}