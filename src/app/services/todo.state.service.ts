import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';

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

  private selectedTasks = new BehaviorSubject<number[]>([]);
  selectedTasks$ = this.selectedTasks.asObservable();

  setTask(task: Note | null) {
    this.taskAdded.next(task);
  }

  deleteTask(taskId: number | null) {
    this.taskDeleted.next(taskId);
  }

  updateTask(task: Note | null) {
    this.taskToUpdate.next(task);
  }

  selectTask(taskId: number): void {
    const currentTasks = this.selectedTasks.value;
    if (!currentTasks.includes(taskId))
      this.selectedTasks.next([...currentTasks, taskId]);
  }

  deselectTask(taskId: number): void {
    const updatedTasks = this.selectedTasks.value.filter((id) => id !== taskId);
    this.selectedTasks.next(updatedTasks);
  }

  deleteManyTasks() {
    const selectedIds = this.selectedTasks.value;
    if (selectedIds.length === 0) return;

    selectedIds.forEach((taskId) => {
      this.taskDeleted.next(taskId);
    });

    this.selectedTasks.next([]);
  }
}
