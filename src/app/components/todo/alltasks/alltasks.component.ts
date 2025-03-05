import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../Core/services/services/todo.service';
import { Note } from '../../../Core/services/model';
import { AuthService } from '../../../Core/services/services/auth.service.component';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-alltasks',
  imports: [TaskCardComponent],
  templateUrl: './alltasks.component.html',
  styleUrl: './alltasks.component.css',
})
export class AlltasksComponent implements OnInit {
  Tasks!: Note[];
  constructor(
    public TodoService: TodoService,
    public AuthService: AuthService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.TodoService.getAllTasks().subscribe({
      next: (res) => {
        this.Tasks = res;
      },
    });
  }
  DeleteNote(TaskId: string) {
    this.Tasks = this.Tasks.filter((task) => task._id !== TaskId);
  }
}
