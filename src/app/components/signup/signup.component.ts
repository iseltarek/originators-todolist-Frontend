import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service.component';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AntdModule } from '../../modules/antd.module';
import { MaterialssModule } from '../../modules/material.module';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [AntdModule, ReactiveFormsModule, MaterialssModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.less',
})
export class SignupComponent {
  errorMessage = '';
  // hide = signal(true);
  hide = '';
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.signUpForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.signUpForm.updateValueAndValidity();
    });
  }

  signUp() {
    const userform: User = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      name: this.signUpForm.value.name,
    };
    this.authService.signup(userform).subscribe({
      next: () => this.router.navigate(['/landingpage/login']),
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }

  passwordMatchValidator: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordsNotMatching: true }
      : null;
  };

  togglePasswordVisibility(event: MouseEvent) {
    // this.hide.set(!this.hide());
    // event.stopPropagation();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  getErrorMessage(controlName: string): string {
    const control = this.signUpForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return `${controlName} is required`;
    if (control.errors['email']) return 'Invalid email format';
    if (control.errors['minlength'])
      return `Minimum length is ${control.errors['minlength'].requiredLength}`;
    if (control.errors['name']) return `User${controlName} is required`;
    if (
      controlName === 'confirmPassword' &&
      this.signUpForm.errors?.['passwordsNotMatching']
    )
      return 'Passwords do not match';

    return '';
  }
}
