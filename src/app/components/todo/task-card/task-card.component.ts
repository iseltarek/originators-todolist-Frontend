import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { MatMenuPanel } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../Core/services/services/todo.service';
import { Note } from '../../../../models/note.model';

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
  constructor(public todoService: TodoService) {}

  getProgressValue(): unknown {
    return 100;
  }

  editTask() {
    throw new Error('Method not implemented.');
  }
  deleteTask() {
    this.todoService.deleteTask(this.Task._id).subscribe({
      next: () => {
        this.DeleteNote.emit(this.Task._id);
      },
    });
  }
}
