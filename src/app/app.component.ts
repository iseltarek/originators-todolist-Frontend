import { Component } from '@angular/core';
import { AntdModule } from './shared/antD.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [AntdModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-app';
}
