import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
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
export class CreateTaskComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  isEditing = false;
  errorMessage = '';
  updatedTaskId: number | null = null;
  tags: string[] = [];
  taskForm: FormGroup;

  constructor(
    public todoService: TodoService,
    public todoStateService: TodoStateService
  ) {
    this.taskForm = new FormGroup({
      title: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>(''),
      date: new FormControl<Date | null>(null),
      status: new FormControl<string>('todo'),
    });
  }

  ngOnInit(): void {
    this.todoStateService.taskToUpdate$.subscribe({
      next: (taskToUpdate) => this.editTask(taskToUpdate as Note),
    });
  }

  createTask() {
    const task: Note = this.buildTaskObject();

    const saveOperation = this.isEditing
      ? this.todoService.updateTask(this.updatedTaskId as number, task)
      : this.todoService.addTask(task);

    saveOperation.subscribe({
      next: (savedTask) => this.handleSuccess(savedTask),
      error: (err) => (this.errorMessage = err.error.message),
    });
  }

  private buildTaskObject(): Note {
    return {
      title: this.taskForm.value.title || '',
      description: this.taskForm.value.description || '',
      status: this.taskForm.value.status || 'todo',
      createdAt: this.taskForm.value.date || new Date(),
      updatedAt: this.isEditing ? new Date() : null,
      dueDate: null,
      tags: [...this.tags],
      customId: this.isEditing ? this.updatedTaskId! : 0,
    };
  }
  handleCancel() {
    this.closeEvent.emit();
  }
  private handleSuccess(savedTask: Note): void {
    this.closeEvent.emit();
    if (this.isEditing) {
      this.todoStateService.updateTask(savedTask);
      this.todoStateService.taskToUpdate.next(null);
    } else {
      this.todoStateService.setTask(savedTask);
    }
    this.isEditing = false;
    this.updatedTaskId = null;
    this.taskForm.reset();
  }

  updateTags(tags: string[] | Event) {
    if (tags instanceof Event) return;
    this.tags = [...tags];
  }

  editTask(taskToUpdate: Note) {
    if (taskToUpdate) {
      this.taskForm.patchValue({
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: taskToUpdate.status,
      });
      this.updateTags(taskToUpdate.tags as string[]);
      this.isEditing = true;
      this.updatedTaskId = taskToUpdate.customId;
    }
  }
}
