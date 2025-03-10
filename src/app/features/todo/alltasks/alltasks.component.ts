import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../Core/services/services/todo.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Note } from '../../../shared/models/note.model';

@Component({
  selector: 'app-alltasks',
  imports: [TaskCardComponent],
  templateUrl: './alltasks.component.html',
  styleUrl: './alltasks.component.css',
})
export class AlltasksComponent implements OnInit {
  Tasks!: Note[];
  constructor(public todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getAllTasks().subscribe({
      next: (res) => {
        this.Tasks = res;
      },
    });
  }
  DeleteNote(TaskId: string) {
    this.Tasks = this.Tasks.filter((task) => task._id !== TaskId);
  }
}
