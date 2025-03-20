import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service.component';
import { catchError, Observable, throwError } from 'rxjs';
import { Note } from '../models/note.model';
import { STORAGE_KEYS } from '../modules/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = environment.apiUrl + '/todos';
  TOKEN_KEY = STORAGE_KEYS.TOKEN_KEY;
  token = localStorage.getItem(this.TOKEN_KEY);
  constructor(
    public httpClient: HttpClient,
    public authenticationService: AuthService
  ) {}

  getTaskById(taskId: number): Observable<Note> {
    return this.httpClient
      .get<Note>(`${this.baseUrl}/${taskId}`, {
        headers: this.getAuthHeader(),
      })
      .pipe(
        catchError((err) => {
          if (err?.error?.status === 401) {
            this.authenticationService.Expired_TOKEN = true;
          }
          return throwError(() => err);
        })
      );
  }
  getAllTasks(): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>(`${this.baseUrl}/`, {
        headers: this.getAuthHeader(),
      })
      .pipe(
        catchError((err) => {
          if (err?.error?.status === 401) {
            this.authenticationService.Expired_TOKEN = true;
          }
          return throwError(() => err);
        })
      );
  }

  updateTask(taskId: number, task: Note): Observable<Note> {
    const body = {
      title: task.title,
      status: task.status,
      description: task.description,
      tags: task.tags,
    };
    return this.httpClient.put<Note>(`${this.baseUrl}/${taskId}`, body, {
      headers: this.getAuthHeader(),
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.httpClient
      .delete(`${this.baseUrl}/${taskId}`, {
        headers: this.getAuthHeader(),
      })
      .pipe(
        catchError((err) => {
          if (err?.error?.status === 401) {
            this.authenticationService.Expired_TOKEN = true;
          }
          return throwError(() => err);
        })
      );
  }

  addTask(Task: Note) {
    const body = {
      title: Task.title,
      status: Task.status,
      description: Task.description,
      tags: Task.tags,
    };
    return this.httpClient
      .post<Note>(`${this.baseUrl}/`, body, {
        headers: this.getAuthHeader(),
      })
      .pipe(
        catchError((err) => {
          if (err?.error?.status === 401) {
            this.authenticationService.Expired_TOKEN = true;
          }
          return throwError(() => err);
        })
      );
  }
  getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
