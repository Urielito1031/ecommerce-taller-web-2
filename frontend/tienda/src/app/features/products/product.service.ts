import { Injectable } from '@angular/core';
import { Product, ProductCrear } from '../../core/model/product.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends ApiService {
 
 
  constructor(){
    super();
    this.baseUrl = environment.apiNodeBaseUrl;
  }

  getProducts(): Observable<Product[]> {
    return this.get<Product[]>('producto');
  }

  getProductById(id:number): Observable<Product> {
    return this.get<Product>(`producto/${id}`);
  }

  filtrarPorCategoria(categoriaid: number): Observable<Product[]> {
    return this.get<Product[]>(`producto?categoriaId=${categoriaid}`);
  }

  crearProducto(producto: FormData): Observable<Product> {
    return this.post<Product>('producto/crear', producto);
  }
}
