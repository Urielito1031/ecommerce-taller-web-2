import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User, SessionUser } from '../../../core/model/user.model';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { environment } from '../../../../environments/environment.development';
import { LoginCredentials, RegisterData } from '../../../core/model/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(private authState: AuthStateService) {
    super();
    this.baseUrl = environment.apiNodeBaseUrl + '/auth';
  }

  register(credentials: RegisterData): Observable<User> {
    this.authState.setLoading(true);

    return this.post<User>('register', credentials).pipe(
      tap(() => {
        this.authState.setLoading(false);
      }),
      catchError((err) => {
        const errorMsg = err.error?.message || 'El registro falló';
        this.authState.setError(errorMsg);
        this.authState.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<User> {
    this.authState.setLoading(true);

    return this.post<User>('login', credentials).pipe(
      tap((responseUser) => {
        const user: User = (responseUser as any)?.user ?? responseUser;
        const sessionUser: SessionUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address
        };
        
        this.authState.setAuth(sessionUser, true);
        this.authState.setLoading(false);
      }),
      catchError((err) => {
        const errorMsg = err.error?.message || 'Login falló';
        this.authState.setError(errorMsg);
        this.authState.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    this.authState.clearAuth();
  }

  getProfile(): Observable<User> {
    return this.get<User>('profile').pipe(
      tap((user) => {
        const sessionUser: SessionUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address
        };
        this.authState.setAuth(sessionUser, true);
      }),
      catchError((err) => {
        this.authState.setError('Falló la carga del perfil');
        return throwError(() => err);
      })
    );
  }
}

