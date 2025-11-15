import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '../../core/model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends ApiService {

  constructor(){
    super();
    this.baseUrl = environment.apiNodeBaseUrl;
  }


  obtenerCategorias(): Observable<Categoria[]> {
    return this.get<Categoria[]>(`categorias`);
  }
 
}
