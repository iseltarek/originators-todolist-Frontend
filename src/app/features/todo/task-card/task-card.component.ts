import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import { MatMenuPanel } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../Core/services/services/todo.service';
import { Note } from '../../../shared/models/note.model';
import { TodoStateService } from '../../../Core/services/services/todo.state.service';
import { AntdModule } from '../../../shared/antD.module';

@Component({
  selector: 'app-task-card',
  imports: [MaterialssModule, CommonModule, AntdModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.less',
})
export class TaskCardComponent implements OnInit {
  chipMenu: MatMenuPanel<any> | null | undefined;
  @Input() Task!: Note;
  @Output() DeleteNote = new EventEmitter<number>();
  constructor(
    public todoService: TodoService,
    public todoStateService: TodoStateService
  ) {}

  ngOnInit() {
    this.getProgressValue();
  }

  getProgressValue(): number {
    if (this.Task.status == 'todo') return 0;
    else if (this.Task.status == 'in-progress') return 50;
    return 100;
  }

  changeStatus(status: string) {
    this.Task.status = status;
  }

  deleteTask() {
    this.todoService.deleteTask(this.Task.customId).subscribe({
      next: () => {
        this.todoStateService.deleteTask(this.Task.customId);
      },
    });
  }

  editTask() {
    if (this.Task.tags)
      for (const tag of this.Task.tags) {
        console.log(tag);
      }
    console.log('no tage');
  }
}
