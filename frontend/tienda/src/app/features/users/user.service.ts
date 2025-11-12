// frontend/tienda/src/app/features/users/user.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  
  constructor() {
    super();
    this.baseUrl = environment.apiNodeBaseUrl + '/users';
  }

  getAllUsers(): Observable<User[]> {
    return this.get<User[]>('');
  }

  createUser(user: User): Observable<User> {
    return this.post<User>('', user);
  }

  getUserById(id: number): Observable<User> {
    return this.get<User>(`${id}`);
  }
}