import { Component, Input } from '@angular/core';
import { Note } from '../../../models/note.model';
import { AntdModule } from '../../../modules/antd.module';
import { CommonModule } from '@angular/common';
import { MaterialssModule } from '../../../modules/material.module';

@Component({
  selector: 'app-task-details',
  imports: [AntdModule, CommonModule, MaterialssModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.less',
})
export class TaskDetailsComponent {
  @Input() taskDetailes!: Note | null;

  closeModal() {
    this.taskDetailes = null;
  }
  constructor() {}
}
