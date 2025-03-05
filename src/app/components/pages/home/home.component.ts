import { Component } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { SideNavComponent } from '../../main/side-nav/side-nav.component';
import { DatePipe } from '@angular/common';
import { TaskCardComponent } from '../../todo/task-card/task-card.component';

@Component({
  selector: 'app-home',
  imports: [MaterialssModule, SideNavComponent, DatePipe, TaskCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  today: Date = new Date();
}
