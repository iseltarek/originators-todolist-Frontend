import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Note } from '../../../models/note.model';
import { TodoService } from '../../../services/todo.service';
import { TodoStateService } from '../../../services/todo.state.service';
import { TaskTagsComponent } from '../task-tags/task-tags.component';
import { AntdModule } from '../../../modules/antd.module';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule, TaskTagsComponent, AntdModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.less',
})
export class CreateTaskComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  submitting = signal(false);
  isVisible = false;
  isEditing = false;
  errorMessage = '';
  updatedTaskId: number | null = null;
  tags: string[] = [];
  taskForm: FormGroup;

  constructor(
    public todoService: TodoService,
    public todoStateService: TodoStateService,
    public modalService: ModalService
  ) {
    this.taskForm = new FormGroup({
      title: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>(''),
      date: new FormControl<Date | null>(null, [Validators.required]),
      status: new FormControl<string>(''),
    });
  }

  ngOnInit(): void {
    const taskToEdit = this.todoStateService.taskToEdit();
    if (taskToEdit) this.prepareEditForm(taskToEdit);

    this.modalService.isModalVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });

    this.modalService.isEditing$.subscribe((editing) => {
      this.isEditing = editing;
    });
  }

  createTask(): void {
    const taskData: Note = this.buildTaskObject();
    if (!this.taskForm.valid) {
      this.errorMessage = this.getErrorMessage();
      return;
    }
    this.submitting.set(true);
    if (this.isEditing) {
      this.todoService
        .updateTask(this.updatedTaskId as number, taskData)
        .subscribe({
          next: (updatedTask) => {
            this.resetTask();
            this.todoStateService.updateTaskInList(updatedTask);
            this.todoStateService.setTaskToEdit(null);
          },
          error: (err) => (this.errorMessage = err.error.message),
        });
    } else {
      this.todoService.addTask(taskData).subscribe({
        next: (addedTask) => {
          this.resetTask();
          this.todoStateService.addTask(addedTask);
        },
        error: (err) => (this.errorMessage = err.error.message),
      });
    }
  }

  private resetTask(): void {
    this.closeEvent.emit();
    this.isEditing = false;
    this.updatedTaskId = null;
    this.taskForm.reset();
  }

  private buildTaskObject(): Note {
    return {
      title: this.taskForm.value.title || '',
      description: this.taskForm.value.description || '',
      status: this.taskForm.value.status || 'todo',
      createdAt: this.taskForm.value.date?.[0] ?? new Date(),
      updatedAt: this.isEditing ? new Date() : null,
      dueDate: this.taskForm.value.date?.[1] ?? null,
      tags: [...this.tags],
      customId: this.isEditing ? this.updatedTaskId! : 0,
    };
  }

  handleCancel(): void {
    this.modalService.closeModal();
    this.modalService.resetSelectedTask();
    if (this.isEditing) this.todoStateService.setTaskToEdit(null);
    this.taskForm.reset();
    this.tags = [];
    this.isEditing = false;
    this.updatedTaskId = null;
    this.errorMessage = '';
  }

  updateTags(tags: string[] | Event) {
    if (tags instanceof Event) return;
    this.tags = [...tags];
  }

  prepareEditForm(taskToUpdate: Note) {
    if (taskToUpdate) {
      this.taskForm.patchValue({
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: taskToUpdate.status,
        date:
          taskToUpdate.createdAt && taskToUpdate.dueDate
            ? [new Date(taskToUpdate.createdAt), new Date(taskToUpdate.dueDate)]
            : null,
      });
      this.updateTags(taskToUpdate.tags as string[]);
      this.isEditing = true;
      this.updatedTaskId = taskToUpdate.customId;
    }
  }

  getErrorMessage(): string {
    for (const controlName in this.taskForm.controls) {
      const control = this.taskForm.get(controlName);

      if (control && control.errors && control.touched) {
        return `${controlName} is required`;
      }
    }
    return '';
  }
}
