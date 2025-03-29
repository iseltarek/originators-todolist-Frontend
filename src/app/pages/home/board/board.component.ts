import { Component, Input, OnInit } from '@angular/core';
import { AntdModule } from '../../../modules/antd.module';
import { AlltasksComponent } from '../../../components/tasks-container/alltasks.component';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../services/todo.service';
import { TodoStateService } from '../../../services/todo.state.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [AntdModule, AlltasksComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.less',
})
export class BoardComponent implements OnInit {
  selectedTasks$!: Observable<number[]>;
  selectedTasksLength$!: Observable<number>;
  constructor(
    public modalService: ModalService,
    public todoService: TodoService,
    public todoStateService: TodoStateService
  ) {}

  ngOnInit() {
    this.selectedTasks$ = this.todoStateService.selectedTasks$;
    this.selectedTasksLength$ = this.selectedTasks$.pipe(
      map((tasks) => tasks.length)
    );
    console.log(this.selectedTasksLength$);
  }

  deleteSelectedTasks() {
    this.todoStateService.selectedTasks$.subscribe({
      next: (tasks) => {
        this.todoService.deleteManyTasks(tasks as number[]).subscribe({
          next: () => this.todoStateService.deleteManyTasks(),
        });
      },
    });
  }

  createTask() {
    this.modalService.openModal();
  }
}
