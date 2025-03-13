import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../Core/services/services/todo.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Note } from '../../../shared/models/note.model';
import { TodoStateService } from '../../../Core/services/services/todo.state.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alltasks',
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './alltasks.component.html',
  styleUrl: './alltasks.component.css',
})
export class AlltasksComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<Note[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  taskAddedSubscription: Subscription | undefined;
  taskDeletedSubscription: Subscription | undefined;
  taskUpdatedSubscription: Subscription | undefined;
  constructor(
    public todoService: TodoService,
    public todoStateService: TodoStateService
  ) {}

  ngOnInit() {
    this.addTask();
    this.deleteTask();
    this.updateTask();
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getAllTasks().subscribe({
      next: (res) => {
        this.tasksSubject.next(res);
      },
    });
  }

  deleteTask() {
    this.taskDeletedSubscription = this.todoStateService.taskDeleted$.subscribe(
      (TaskId) => {
        const updatedTasks = this.tasksSubject.value.filter(
          (task) => task.customId !== TaskId
        );
        this.tasksSubject.next(updatedTasks);
      }
    );
  }

  addTask() {
    this.taskAddedSubscription = this.todoStateService.taskAdded$.subscribe(
      (task) => {
        if (task) {
          const updatedTasks = [...this.tasksSubject.value, task];
          this.tasksSubject.next(updatedTasks);
        }
      }
    );
  }

  updateTask() {
    this.taskUpdatedSubscription =
      this.todoStateService.taskToUpdate$.subscribe((updatedTask) => {
        if (updatedTask) {
          const currentTasks = this.tasksSubject.value;
          const taskIndex = currentTasks.findIndex(
            (task) => task.customId === updatedTask.customId
          );

          if (taskIndex !== -1) {
            const updatedTasks = [...currentTasks];
            updatedTasks[taskIndex] = updatedTask;
            this.tasksSubject.next(updatedTasks);
          }
        }
      });
  }
  ngOnDestroy() {
    this.taskAddedSubscription!.unsubscribe();
  }
}
