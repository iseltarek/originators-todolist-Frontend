import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service.component';
import { Observable } from 'rxjs';
import { Note } from '../../../shared/models/note.model';
import { STORAGE_KEYS } from '../../../shared/storage-keys';

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

  getTaskById(taskId: string): Observable<Note> {
    return this.httpClient.get<Note>(`${this.baseUrl}/${taskId}`);
  }
  getAllTasks(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.baseUrl}/`, {
      headers: this.getAuthHeader(),
    });
  }
  deleteTask(taskId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${taskId}`, {
      headers: this.getAuthHeader(),
    });
  }

  addTask(Task: Note) {
    const body = {
      title: Task.title,
      status: Task.status,
      description: Task.description,
      tags: Task.tags,
    };
    return this.httpClient.post<Note>(`${this.baseUrl}/`, body, {
      headers: this.getAuthHeader(),
    });
  }
  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }
}
