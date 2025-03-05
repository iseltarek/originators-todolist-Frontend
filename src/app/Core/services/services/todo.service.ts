import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  token = localStorage.getItem('token');
  baseUrl = environment.apiUrl + '/todos';
  constructor(public httpClient: HttpClient, public authService: AuthService) {}
}
