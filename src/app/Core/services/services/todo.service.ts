import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service.component';
import { Observable } from 'rxjs';
import { Note } from '../../../shared/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  token = localStorage.getItem('token');
  baseUrl = environment.apiUrl + '/todos';
  constructor(
    public httpClient: HttpClient,
    public authenticationService: AuthService
  ) {}

  getTaskById(taskId: number): Observable<Note> {
    return this.httpClient.get<Note>(`${this.baseUrl}/${taskId}`, {
      headers: this.getAuthHeader(),
    });
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

  addTask(task: Note) {
    const body = {
      title: task.title,
      status: task.status,
      description: task.description,
      tags: task.tags,
    };
    return this.httpClient.post<Note>(`${this.baseUrl}/`, body, {
      headers: this.getAuthHeader(),
    });
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

  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }
}
