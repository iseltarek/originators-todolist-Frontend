import { Component } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';

@Component({
  selector: 'app-signup',
  imports: [MaterialssModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {}
