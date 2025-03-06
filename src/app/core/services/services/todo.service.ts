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
  // TODO: still explicit url dont write explicit code make your code configuraable based on variables 
  baseUrl = 'http://localhost:3000' + '/todos';

  // TODO: authService to be authenticationService, write simple 
  constructor(public httpClient: HttpClient, public authService: AuthService) {}

  // TODO: TaskId to taskId/todoId
  getTaskById(TaskId: string): Observable<Note> {
    return this.httpClient.get<Note>(`${this.baseUrl}/${TaskId}`);
  }
  getAllTasks(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.baseUrl}/`, {
      headers: this.getAuthHeader(),
    });
  }

  // TODO: mistake to write a function with Capital Letter ``DeleteTask`` also dont use ``any`` use your own data type if not create a datatype Model/Interface
  DeleteTask(TaskId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${TaskId}`, {
      headers: this.getAuthHeader(),
    });
  }
  // TODO: mistake to write a function with Capital Letter ``AddTask``
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
