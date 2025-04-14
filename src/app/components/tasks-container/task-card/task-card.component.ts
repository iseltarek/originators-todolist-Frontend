import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialssModule } from '../../../modules/material.module';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../services/todo.service';
import { Note } from '../../../models/note.model';
import { TodoStateService } from '../../../services/todo.state.service';
import { AntdModule } from '../../../modules/antd.module';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-task-card',
  imports: [MaterialssModule, CommonModule, AntdModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.less',
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Note;
  @Output() DeleteNote = new EventEmitter<number>();
  isChecked = false;
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

  onCheckboxChange(check: boolean) {
    if (check) {
      this.todoStateService.selectTask(this.task.customId);
    } else {
      this.todoStateService.deselectTask(this.task.customId);
    }
  }

  // changeStatus(status: string) {
  //   this.task.status = status;
  //   this.todoService.updateTask(this.task.customId, this.task).subscribe({
  //     next: (resulteTask) => {
  //       this.todoStateService.updateTask(resulteTask);
  //     },
  //   });
  // }

  deleteTask() {
    this.todoStateService.deleteTask(this.task.customId);
    this.todoService.deleteTask(this.task.customId).subscribe({
      error: () => {
        this.todoStateService.undoDeleteTask(this.task);
      },
    });
  }

  editTask() {
    this.modalService.openModal(true);
    this.todoStateService.setTaskToEdit(this.task);
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
