import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // CODE-REVIEW 
  // TODO: wrong based url 
  // it should be just specific based on that service for example serviceUrl=/users /auth ...etc
  // baseUrl should be in the main app with al env urls  
  // TODO: remove all consoles 
  // TODO: make all function singuatures well defined public/private + return type
  // TODO: make variable and functions names well [ isUserAuthenticated - getUserToken .....etc ]

  // TODO: all folders names lowercases - Core - core
  baseUrl = 'http://localhost:3000';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(public httpClient: HttpClient, public router: Router) {}

  // dont use any unless you cant use anything except it.
  login(name: string, password: string): Observable<any> {
    console.log(name);
    console.log(password);
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, {
        name,
        password,
      })
      .pipe(
        map((response: AuthResponse) => {
          if (response) {
            localStorage.setItem('token', response.verificationToken);
          }
          return response;
        })
      );
  }

  signup(name: string, password: string): Observable<any> {
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

  logout(): void {
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
