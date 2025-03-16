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
  styleUrl: './alltasks.component.less',
})
export class AlltasksComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<Note[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  taskAddedSubscription: Subscription | undefined;
  taskDeletedSubscription: Subscription | undefined;
  logoutSubscription: Subscription | undefined;

  constructor(
    public todoService: TodoService,
    public todoStateService: TodoStateService
  ) {}

  ngOnInit() {
    this.addTask();
    this.deleteNote();
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getAllTasks().subscribe({
      next: (res) => {
        this.tasksSubject.next(res);
      },
    });
  }

  deleteNote() {
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
  resetTasks() {
    this.tasksSubject.next([]);
  }

  ngOnDestroy() {
    this.taskAddedSubscription!.unsubscribe();
  }
}
