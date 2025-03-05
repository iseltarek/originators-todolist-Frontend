import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service.component';
import { Observable } from 'rxjs';
import { Note } from '../model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  token = localStorage.getItem('token');
  baseUrl = 'http://localhost:3000' + '/todos';
  constructor(public httpClient: HttpClient, public authService: AuthService) {}

  getTaskById(TaskId: string): Observable<Note> {
    return this.httpClient.get<Note>(`${this.baseUrl}/${TaskId}`);
  }
  getAllTasks(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.baseUrl}/`, {
      headers: this.getAuthHeader(),
    });
  }
  DeleteTask(TaskId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${TaskId}`, {
      headers: this.getAuthHeader(),
    });
  }
  AddTask(Task: Note) {
    const body = {
      title: Task.title,
      status: Task.status,
      description: Task.description,
    };
    return this.httpClient.post(`${this.baseUrl}/todos/`, body, {
      headers: this.getAuthHeader(),
    });
  }
  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }
}
