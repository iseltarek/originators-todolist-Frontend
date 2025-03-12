import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../../../shared/models/authresponse.model';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + '/auth';
  TokenKey = 'token';
  private isAuthenticatedUserSubject = new BehaviorSubject<boolean>(false);
  constructor(public httpClient: HttpClient, public router: Router) {}

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/login`, {
        password,
        email,
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
  // public getUserName(): string {
  //   const UserToken = localStorage.getItem(this.TokenKey);
  //   return UserToken.name;
  // }
}
