import { Component, signal } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';
import { AuthService } from '../../../Core/services/services/auth.service.component';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-signup',
  imports: [AuthFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  errorMassege = '';
  constructor(private authService: AuthService, private router: Router) {}

  signup(signupForm: User) {
    console.log(signupForm.name);
    this.authService.signup(signupForm).subscribe({
      next: () => this.router.navigate(['/landingpage/login']),
      error: (err) => (this.errorMassege = err.error.massage),
    });
  }
}
