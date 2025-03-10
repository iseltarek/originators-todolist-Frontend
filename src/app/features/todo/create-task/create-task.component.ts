import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Note } from '../../../shared/models/note.model';
import { TodoService } from '../../../Core/services/services/todo.service';

@Component({
  selector: 'app-create-task',
  imports: [MaterialssModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() NotetoAddOutput = new EventEmitter<Note>();
  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
  });
  task!: Note;
  constructor(public todoService: TodoService) {}

  createTask() {
    this.task.title = this.taskForm.value.title as string;
    this.task.description = this.taskForm.value.description as string;
    this.task.status = 'todo';
    this.todoService.addTask(this.task).subscribe({
      next: () => {
        this.taskForm.reset();
        this.NotetoAddOutput.emit(this.task);
        this.closeEvent.emit();
      },
    });
  }
}
