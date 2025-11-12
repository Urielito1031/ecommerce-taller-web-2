// frontend/tienda/src/app/core/services/auth.state.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { SessionUser } from '../model/user.model';

const AUTH_STORAGE_KEY = 'auth_session';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private _user = signal<SessionUser | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly isAuthenticated = computed(() => !!this._user());
  readonly userFullName = computed(() => {
    const u = this._user();
    return u ? `${u.firstName} ${u.lastName}` : null;
  });

  constructor() {
    this.hydrateFromStorage();
  }

  setAuth(user: SessionUser | null, persist = true) {
    this._user.set(user);
    this._error.set(null);

    if (persist && user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  }

  clearAuth() {
    this._user.set(null);
    this._error.set(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }

  setError(message: string | null) {
    this._error.set(message);
  }

  private hydrateFromStorage() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const user = JSON.parse(raw) as SessionUser;
        this._user.set(user);
      }
    } catch (e) {
      console.warn('Failed to hydrate auth state', e);
    }
  }
}