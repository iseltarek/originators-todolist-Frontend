import { Component, signal } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/services/auth.service/auth.service.component';
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
        },
        error: (err) => {
          console.log(err.message);
          this.errorMessage = err.error.message;
        },
      });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
