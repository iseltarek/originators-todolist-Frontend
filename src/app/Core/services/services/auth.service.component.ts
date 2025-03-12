import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { AuthResponse } from '../../../shared/models/authresponse.model';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user.model';
import { STORAGE_KEYS } from '../../../shared/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + '/auth';

  readonly TOKEN_KEY = STORAGE_KEYS.TOKEN_KEY;
  readonly USER_DATA_KEY = STORAGE_KEYS.USER_DATA_KEY;
  private readonly SESSION_EXPIRY_KEY = STORAGE_KEYS.SESSION_EXPIRY_KEY;
  private readonly SESSION_DURATION = 60 * 60 * 1000;

  private isAuthenticatedUserSubject = new BehaviorSubject<boolean>(false);
  constructor(public httpClient: HttpClient, public router: Router) {}

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/login`, {
        password,
        email,
      })
      .pipe(
        tap((user) => {
          if (user) {
            this.setUserSession(user);
          }
        })
      );
  }

  public signup(user: User): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/register`, {
        name: user.name,
        password: user.password,
        email: user.email,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  public logout(): void {
    sessionStorage.removeItem(this.SESSION_EXPIRY_KEY);
    sessionStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedUserSubject.next(false);
    sessionStorage.clear();
    this.router.navigate(['/landingpage']);
  }

  private setUserSession(user: AuthResponse): void {
    if (user) {
      const data = {
        name: user.user.name,
        email: user.user.email,
        token: user.verificationToken,
      };
      localStorage.setItem(this.TOKEN_KEY, data.token);
      sessionStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));
      this.setSessionExpiry();
      this.isAuthenticatedUserSubject.next(true);

      this.startSessionExpiryCheck();
    }
  }

  private setSessionExpiry(): void {
    const expiryTime = new Date().getTime() + this.SESSION_DURATION;
    sessionStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString());
  }

  private checkSessionExpiry(): void {
    const expiryTime = sessionStorage.getItem(this.SESSION_EXPIRY_KEY);
    if (expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= +expiryTime) {
        this.logout();
      }
    }
  }

  private startSessionExpiryCheck(): void {
    setInterval(() => {
      this.checkSessionExpiry();
    }, 10 * 60 * 1000);
  }

  public isUserAuthenticated(): boolean {
    this.checkSessionExpiry();
    return (
      this.isAuthenticatedUserSubject.value ||
      !!localStorage.getItem(this.TOKEN_KEY)
    );
  }
}
