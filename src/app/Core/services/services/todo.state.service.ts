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

  setTask(task: Note | null) {
    this.taskAdded.next(task);
  }

  deleteTask(taskId: number) {
    this.taskDeleted.next(taskId);
  }
}
