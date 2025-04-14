import { Component, effect, OnInit } from '@angular/core';
import { AntdModule } from '../../../modules/antd.module';
import { AlltasksComponent } from '../../../components/tasks-container/alltasks.component';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../services/todo.service';
import { TodoStateService } from '../../../services/todo.state.service';

@Component({
  selector: 'app-board',
  imports: [AntdModule, AlltasksComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.less',
})
export class BoardComponent {
  selectedTasksIds: number[] = [];
  constructor(
    public modalService: ModalService,
    public todoService: TodoService,
    public todoStateService: TodoStateService
  ) {
    effect(() => {
      this.selectedTasksIds = this.todoStateService.tasksSelected();
    });
  }
  deleteSelectedTasks() {
    if (this.selectedTasksIds.length === 0) return;

    this.todoService.deleteManyTasks(this.selectedTasksIds).subscribe({
      next: () => this.todoStateService.deleteManyTasks(),
    });
  }

  createTask() {
    this.modalService.openModal();
  }
}
