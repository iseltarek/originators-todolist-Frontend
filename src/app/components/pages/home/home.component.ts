import { Component } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { SideNavComponent } from '../../main/side-nav/side-nav.component';
import { DatePipe } from '@angular/common';
import { TaskCardComponent } from '../../todo/task-card/task-card.component';
import { AlltasksComponent } from '../../todo/alltasks/alltasks.component';

@Component({
  selector: 'app-home',
  imports: [MaterialssModule, SideNavComponent, DatePipe, AlltasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  today: Date = new Date();
  //constructor(AuthService: AuthService) {}
}
