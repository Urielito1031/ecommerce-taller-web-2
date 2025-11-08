import { Injectable } from '@angular/core';
import { Product } from '../../core/model/product.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends ApiService{

  constructor(){
    super();
    this.baseUrl = environment.apiProductUrl;
  }
  

  getProducts(): Observable<Product[]> {
    return this.get<Product[]>('products');
  }
  getProductById(id:number):Observable<Product>{
    return this.get<Product>(`products/${id}`);
  }
}
