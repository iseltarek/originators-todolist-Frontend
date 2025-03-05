import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:3000';
  TokenKey = 'token';
  private isAuthenticatedUserSubject = new BehaviorSubject<boolean>(false);
  constructor(public httpClient: HttpClient, public router: Router) {}

  public login(name: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, {
        name,
        password,
      })
      .pipe(
        map((response: AuthResponse) => {
          if (response) {
            localStorage.setItem(this.TokenKey, response.verificationToken);
            this.isAuthenticatedUserSubject.next(true);
          }
          return response;
        })
      );
  }

  public signup(name: string, password: string): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/auth/register`, {
        name,
        password,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  public logout(): void {
    this.isAuthenticatedUserSubject.next(false);
    localStorage.removeItem(this.TokenKey);
    this.router.navigate(['/landingpage']);
  }

  public isUserAuthenticated(): boolean {
    return (
      this.isAuthenticatedUserSubject.value ||
      !!localStorage.getItem(this.TokenKey)
    );
  }
}
