import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TaskCardComponent } from './task-card/task-card.component';
import { Note } from '../../models/note.model';
import { TodoStateService } from '../../services/todo.state.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-alltasks',
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './alltasks.component.html',
  styleUrl: './alltasks.component.less',
})
export class AlltasksComponent {
  tasks;

  constructor(
    public todoStateService: TodoStateService,
    public authnticationService: AuthService,
    public modalService: ModalService
  ) {
    this.todoStateService.loadAllTasks();
    this.tasks = this.todoStateService.allTasks;
  }

  ngOnInit() {
    this.authnticationService.isAuthenticatedUserSubject$.subscribe({
      next: (isAuthenticated) => {
        if (!isAuthenticated) {
          this.todoStateService.resetTasks();
          this.modalService.resetSelectedTask();
        }
      },
    });
  }
  trackByCustomId(index: number, task: Note) {
    return task.customId;
  }
  // tasks: Note[] = [];
  // taskAddedSubscription: Subscription | undefined;
  // taskDeletedSubscription: Subscription | undefined;
  // taskUpdatedSubscription: Subscription | undefined;
  // manyTasksDeleteSubscription: Subscription | undefined;
  // logoutSubscription: Subscription | undefined;

  // @Output() selectedTasks = new EventEmitter<number>();
  // constructor(
  //   public todoService: TodoService,
  //   public todoStateService: TodoStateService,
  //   public authnticationService: AuthService,
  //   public modalService: ModalService
  // ) {}

  // ngOnInit() {
  //   this.authnticationService.isAuthenticatedUserSubject$.subscribe({
  //     next: (isAuthenticated) => {
  //       if (!isAuthenticated) {
  //         this.resetTasks();
  //       }
  //     },
  //   });
  //   this.updateTask();
  //   this.deleteTask();
  //   this.addTask();
  //   this.loadTasks();
  // }

  // loadTasks() {
  //   this.todoService.getAllTasks().subscribe({
  //     next: (res) => {
  //       this.tasks = res;
  //     },
  //   });
  // }

  // deleteTask() {
  //   this.taskDeletedSubscription = this.todoStateService.taskDeleted$.subscribe(
  //     (TaskId) => {
  //       this.tasks = this.tasks.filter((task) => task.customId !== TaskId);
  //     }
  //   );
  // }

  // addTask() {
  //   this.taskAddedSubscription = this.todoStateService.taskAdded$.subscribe(
  //     (task) => {
  //       if (task) {
  //         this.tasks.push(task);
  //       }
  //     }
  //   );
  // }

  // updateTask() {
  //   this.taskUpdatedSubscription =
  //     this.todoStateService.taskToUpdate$.subscribe((updatedTask) => {
  //       if (updatedTask) {
  //         const taskIndex = this.tasks.findIndex(
  //           (task) => task.customId === updatedTask.customId
  //         );

  //         if (taskIndex !== -1) {
  //           this.tasks[taskIndex] = updatedTask;
  //         }
  //       }
  //     });
  // }

  // addselectedTasks(taskId: number): void {
  //   this.selectedTasks.emit(taskId);
  // }

  // resetTasks() {
  //   this.tasks = [];
  //   this.todoStateService.setTask(null);
  //   // this.todoStateService.deleteTask(null);
  //   this.todoStateService.updateTask(null);
  //   this.modalService.resetSelectedTask();
  // }
  // ngOnDestroy() {
  //   this.taskAddedSubscription?.unsubscribe();
  //   this.taskDeletedSubscription?.unsubscribe();
  //   this.taskUpdatedSubscription?.unsubscribe();
  //   this.logoutSubscription?.unsubscribe();
  // }
}
