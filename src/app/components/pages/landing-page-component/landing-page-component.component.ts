import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../../Auth/login/login.component';

@Component({
  selector: 'app-landing-page-component',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './landing-page-component.component.html',
  styleUrl: './landing-page-component.component.css',
})
export class LandingPageComponentComponent {}
