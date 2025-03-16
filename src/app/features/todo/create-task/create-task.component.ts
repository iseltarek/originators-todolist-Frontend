import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Note } from '../../../shared/models/note.model';
import { TodoService } from '../../../Core/services/services/todo.service';
import { TodoStateService } from '../../../Core/services/services/todo.state.service';
import { TaskTagsComponent } from '../task-tags/task-tags.component';
import { AntdModule } from '../../../shared/antD.module';

@Component({
  selector: 'app-create-task',
  imports: [
    MaterialssModule,
    ReactiveFormsModule,
    TaskTagsComponent,
    AntdModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.less',
})
export class CreateTaskComponent {
  errorMessage = '';
  tags: string[] = [];
  @Output() closeEvent = new EventEmitter<void>();
  taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    date: new FormControl<Date | null>(null),
    status: new FormControl<string>(''),
  });
  constructor(
    public todoService: TodoService,
    public todoStateService: TodoStateService
  ) {}

  createTask() {
    const newTask: Note = {
      title: this.taskForm.get('title')?.value || '',
      description: this.taskForm.get('description')?.value || '',
      status: this.taskForm.get('status')?.value || 'todo',
      createdAt: (this.taskForm.get('date')?.value as Date) || new Date(),
      updatedAt: null,
      dueDate: null,
      tags: this.tags,
      customId: 0,
    };

    this.todoService.addTask(newTask).subscribe({
      next: (createdTask: Note) => {
        this.closeEvent.emit();
        this.todoStateService.setTask(createdTask);
        this.taskForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }
  updateTags(tags: string[] | Event) {
    if (tags instanceof Event) return;
    this.tags = [...tags];
  }
  handleCancel() {
    this.closeEvent.emit();
  }
}
