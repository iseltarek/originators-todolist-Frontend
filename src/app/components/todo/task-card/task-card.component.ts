import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialssModule } from '../../../core/services/material.module';
import { MatMenuPanel } from '@angular/material/menu';
import { Note } from '../../../core/services/model';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../core/services/services/todo.service';

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
  // TODO: GetProgressValue : getProgressValue
  GetProgressValue(): unknown {
    return 100;
  }

   // TODO: EditTask : editTask
  EditTask() {
    // TODO: write messages in json files and put the key here.
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
