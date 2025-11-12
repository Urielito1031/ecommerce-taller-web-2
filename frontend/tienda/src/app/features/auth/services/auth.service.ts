// frontend/tienda/src/app/features/auth/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../../core/model/user.model';
import { LoginCredentials, RegisterData } from '../../../core/model/credentials.model';
import { AuthStateService } from '../../../core/services/auth.state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private authService = inject(AuthStateService);

  constructor() {
    super();
    this.baseUrl = environment.apiNodeBaseUrl + '/auth';
    
    this.authService.setAuthApi(this);
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