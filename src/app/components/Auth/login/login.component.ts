import { Component, signal } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/services/services/auth.service.component';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../Core/services/auth.guard';

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
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    public authService: AuthService,
    public router: Router,
    public authGuard: AuthGuard
  ) {}

  handleLogin() {
    this.authService
      .login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
