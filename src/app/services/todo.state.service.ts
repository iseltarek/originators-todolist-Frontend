import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private taskDeleted = new BehaviorSubject<number | null>(null);
  taskDeleted$ = this.taskDeleted.asObservable();

  // private taskAdded = new BehaviorSubject<Note | null>(null);
  // taskAdded$ = this.taskAdded.asObservable();

  // taskToUpdate = new BehaviorSubject<Note | null>(null);
  // taskToUpdate$ = this.taskToUpdate.asObservable();

  private selectedTasks = new BehaviorSubject<number[]>([]);
  selectedTasks$ = this.selectedTasks.asObservable();

  // setTask(task: Note | null) {
  //   this.taskAdded.next(task);
  // }

  // deleteTask(taskId: number | null) {
  //   this.taskDeleted.next(taskId);
  // }

  // updateTask(task: Note | null) {
  //   this.taskToUpdate.next(task);
  // }

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

  private _allTasks = signal<Note[]>([]);
  allTasks = this._allTasks.asReadonly();

  private _deletedTasks = signal<Note[]>([]);
  deletedTasks = this._deletedTasks.asReadonly();

  private _taskToEdit = signal<Note | null>(null);
  taskToEdit = this._taskToEdit.asReadonly();

  constructor(public todoService: TodoService) {}

  loadAllTasks() {
    this.todoService.getAllTasks().subscribe({
      next: (tasks) => this._allTasks.set(tasks),
    });
  }

  addTask(task: Note) {
    this._allTasks.update((tasks) => [...tasks, task]);
  }

  deleteTask(taskId: number) {
    const taskToDelete = this._allTasks().find(
      (task) => task.customId === taskId
    );
    if (!taskToDelete) return;

    this._allTasks.update((tasks) =>
      tasks.filter((task) => task.customId !== taskId)
    );
    this._deletedTasks.update((deleted) => [...deleted, taskToDelete]);
  }

  undoDeleteTask(task: Note) {
    this._allTasks.update((tasks) => [...tasks, task]);
    this._deletedTasks.update((deleted) =>
      deleted.filter((t) => t.customId !== task.customId)
    );
  }

  setTaskToEdit(task: Note | null) {
    this._taskToEdit.set(task);
  }

  updateTaskInList(updatedTask: Note) {
    this._allTasks.update((tasks) =>
      tasks.map((task) =>
        task.customId === updatedTask.customId ? updatedTask : task
      )
    );
  }

  resetTasks() {
    this._allTasks.set([]);
  }
}
