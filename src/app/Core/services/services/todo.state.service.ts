import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../../../shared/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private taskDeleted = new BehaviorSubject<number | null>(null);
  taskDeleted$ = this.taskDeleted.asObservable();
  private taskAdded = new BehaviorSubject<Note | null>(null);
  taskAdded$ = this.taskAdded.asObservable();
  taskToUpdate = new BehaviorSubject<Note | null>(null);
  taskToUpdate$ = this.taskToUpdate.asObservable();

  setTask(task: Note | null) {
    this.taskAdded.next(task);
  }

  deleteTask(taskId: number | null) {
    this.taskDeleted.next(taskId);
  }

  updateTask(task: Note | null) {
    this.taskToUpdate.next(task);
  }
}
