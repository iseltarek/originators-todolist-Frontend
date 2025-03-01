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


// TODO: wrong components structrure 
// components - 
  // login
  // signup
// pages (I dont prefer this structure) to devided that into a components and pages 
// make it all components 
// landing page also to be home  