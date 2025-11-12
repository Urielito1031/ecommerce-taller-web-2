import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../../core/model/user.model';
import { LoginCredentials, RegisterData } from '../../../core/model/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor() {
    super();
    this.baseUrl = environment.apiNodeBaseUrl + '/auth';
  }

  register(credentials: RegisterData): Observable<User> {
    return this.post<User>('register', credentials);
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.post<User>('login', credentials);
  }

  //no existe todavia en el backend
  getProfile(): Observable<User> {
    return this.get<User>('profile');
  }
}