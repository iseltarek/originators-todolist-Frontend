import { Component, signal } from '@angular/core';
import { MaterialssModule } from '../../../core/services/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service/auth.service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialssModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage = '';
  hide = signal(true);

  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public authService: AuthService, public router: Router) {}

  // there is a better name that OnLogIn (too old naming concept)
  OnLogIn() {
    this.authService
      .login(
        this.loginForm.value.name as string,
        this.loginForm.value.password as string
      )
      .subscribe({
        next: () => {
          console.log('done');
          this.router.navigate(['/todo']);
          // navigation is good but I still can back to home and register 
          // You have to authentiacte/guards on Routes
        },
        error: (err) => {
          // use angular popup builtins (snakbars) I guess. to alert all users situations instead of consoles
          console.log(err.message);
          this.errorMessage = err.error.message;
        },
      });
  }

  // click event for what???? - make it for a function like disapleLoginOnClick for examples
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
