import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {


  protected http = inject(HttpClient);
  protected baseUrl: string = '';

  get<T>(endpoint:string): Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);

  }

  post<T>(endpoint:string,data:unknown):Observable<T>{
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`,data);
  }

  put<T>(endpoint:string,data:unknown):Observable<T>{
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`,data);
  }
}
