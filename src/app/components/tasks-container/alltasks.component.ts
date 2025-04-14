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
}
