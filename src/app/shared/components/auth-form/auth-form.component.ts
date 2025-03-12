import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MaterialssModule } from '../../material.module';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-auth-form',
  imports: [MaterialssModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
  @Input() formType: 'login' | 'signup' = 'login';
  @Output() formSubmit = new EventEmitter<User>();
  @Input() errorMessage: string | null = null;

  hide = signal(true);
  authForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.authForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        name: [''],
      },
      {
        validators:
          this.formType === 'signup' ? this.passwordMatchValidator : null,
      }
    );
  }

  ngOnInit() {
    if (this.formType === 'signup') {
      this.authForm.addControl(
        'confirmPassword',
        this.fb.control('', [Validators.required])
      );
    }
    this.authForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.authForm.updateValueAndValidity();
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

  submitForm() {
    if (this.authForm.valid) {
      this.formSubmit.emit(this.authForm.value);
    }
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  navigateToSignup() {
    this.router.navigate(['/landingpage/signup']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  getErrorMessage(controlName: string): string {
    const control = this.authForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return `${controlName} is required`;
    if (control.errors['email']) return 'Invalid email format';
    if (control.errors['minlength'])
      return `Minimum length is ${control.errors['minlength'].requiredLength}`;
    if (
      controlName === 'confirmPassword' &&
      this.authForm.errors?.['passwordsNotMatching']
    )
      return 'Passwords do not match';

    return '';
  }
}
