import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import { MatMenuPanel } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../Core/services/services/todo.service';
import { Note } from '../../../shared/models/note.model';
import { TodoStateService } from '../../../Core/services/services/todo.state.service';
import { AntdModule } from '../../../shared/antD.module';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-task-card',
  imports: [MaterialssModule, CommonModule, AntdModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.less',
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Note;
  @Output() DeleteNote = new EventEmitter<number>();

  constructor(
    public todoService: TodoService,
    public todoStateService: TodoStateService,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    this.getProgressValue();
  }

  getProgressValue(): number {
    if (this.task.status == 'todo') return 0;
    else if (this.task.status == 'in-progress') return 50;
    return 100;
  }

  changeStatus(status: string) {
    this.task.status = status;
    this.todoService.updateTask(this.task.customId, this.task).subscribe({
      next: (resulteTask) => {
        this.todoStateService.updateTask(resulteTask);
      },
    });
  }

  deleteTask() {
    this.todoService.deleteTask(this.task.customId).subscribe({
      next: () => {
        this.todoStateService.deleteTask(this.task.customId);
      },
    });
  }

  editTask() {
    this.todoService.getTaskById(this.task.customId).subscribe({
      next: (resulteTask) => {
        this.modalService.openModal(true);
        this.todoStateService.updateTask(resulteTask);
      },
    });
  }
  openTaskDetails(event: Event) {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.closest('.menu') || clickedElement.closest('.status')) {
      return;
    }
    this.modalService.closeSelectedTaskModal();
    this.modalService.openSelectedTaskModal(this.task as Note);
  }
}
