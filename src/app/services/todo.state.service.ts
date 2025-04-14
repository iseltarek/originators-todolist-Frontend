import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private _allTasks = signal<Note[]>([]);
  allTasks = this._allTasks.asReadonly();

  private _deletedTasks = signal<Note[]>([]);
  deletedTasks = this._deletedTasks.asReadonly();

  private _taskToEdit = signal<Note | null>(null);
  taskToEdit = this._taskToEdit.asReadonly();

  private _tasksSelected = signal<number[]>([]);
  tasksSelected = this._tasksSelected.asReadonly();

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

  selectTask(taskId: number): void {
    const currentTasks = this._tasksSelected();
    if (!currentTasks.includes(taskId))
      this._tasksSelected.update((tasksIds) => [...tasksIds, taskId]);
  }

  deselectTask(taskId: number): void {
    this._tasksSelected.update((tasks) => tasks.filter((id) => id !== taskId));
  }

  deleteManyTasks() {
    const selectedIds = this._tasksSelected();
    if (selectedIds.length === 0) return;
    selectedIds.forEach((taskId) => {
      this.deleteTask(taskId);
    });
    this._taskToEdit.set(null);
  }

  resetTasks() {
    this._allTasks.set([]);
    this._tasksSelected.set([]);
    this._deletedTasks.set([]);
  }
}
