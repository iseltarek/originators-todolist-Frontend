import { Component, signal } from '@angular/core';
import { AuthService } from '../../../Core/services/services/auth.service.component';
import { Router, RouterLink } from '@angular/router';
import { AuthGuard } from '../../../Core/services/gurds/auth.guard';
import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';
import { User } from '../../../shared/models/user.model';

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
