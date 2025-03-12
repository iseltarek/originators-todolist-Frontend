import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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

  hide = signal(true);
  authForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
    });
  }

  ngOnInit() {
    if (this.formType === 'signup') {
      this.authForm.addControl(
        'confirmPassword',
        this.fb.control('', [Validators.required])
      );
    }
  }

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
}
