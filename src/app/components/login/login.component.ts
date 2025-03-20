import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service.component';
import { Router, RouterLink } from '@angular/router';
import { AuthGuard } from '../../gurds/auth.guard';
import { User } from '../../models/user.model';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage = signal<string | null>(null);

  constructor(
    public authService: AuthService,
    public router: Router,
    public authGuard: AuthGuard
  ) {}

  login(loginForm: User) {
    this.authService
      .login(loginForm.email as string, loginForm.password as string)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
      });
  }
}
