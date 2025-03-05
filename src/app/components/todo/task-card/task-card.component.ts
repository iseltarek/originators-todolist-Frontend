import { Component } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-task-card',
  imports: [MaterialssModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  chipMenu: MatMenuPanel<any> | null | undefined;
  GetProgressValue(): unknown {
    return 100;
  }
  task = 'my task';
}
