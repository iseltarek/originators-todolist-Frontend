import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service.component';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-signup',
  imports: [AuthFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  errorMessage = signal<string | null>(null);
  constructor(private authService: AuthService, private router: Router) {}

  signup(signupForm: User) {
    this.authService.signup(signupForm).subscribe({
      next: () => this.router.navigate(['/landingpage/login']),
      error: (err) => {
        this.errorMessage.set(err.error.message);
      },
    });
  }
}
