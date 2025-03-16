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
  chipMenu: MatMenuPanel<any> | null | undefined;
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
        this.modalService.openModal();
        this.todoStateService.updateTask(resulteTask);
      },
    });
  }
}
