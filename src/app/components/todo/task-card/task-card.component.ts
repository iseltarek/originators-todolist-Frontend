import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { MatMenuPanel } from '@angular/material/menu';
import { Note } from '../../../Core/services/model';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../Core/services/services/todo.service';

@Component({
  selector: 'app-task-card',
  imports: [MaterialssModule, CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  chipMenu: MatMenuPanel<any> | null | undefined;
  @Input() Task!: Note;
  @Output() DeleteNote = new EventEmitter<string>();
  constructor(public TaskService: TodoService) {}
  GetProgressValue(): unknown {
    return 100;
  }

  EditTask() {
    throw new Error('Method not implemented.');
  }
  DeleteTask() {
    this.TaskService.DeleteTask(this.Task._id).subscribe({
      next: () => {
        this.DeleteNote.emit(this.Task._id);
      },
    });
  }
}
