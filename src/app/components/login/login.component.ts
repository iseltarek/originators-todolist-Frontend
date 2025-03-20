import { Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service.component';
import { Router, RouterLink } from '@angular/router';
import { AuthGuard } from '../../gurds/auth.guard';
import { User } from '../../models/user.model';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { AntdModule } from '../../modules/antd.module';
import { MaterialssModule } from '../../modules/material.module';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [AntdModule, MaterialssModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  errorMessage = '';
  hide = '';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public authGuard: AuthGuard
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
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
  navigateToSignup() {
    this.router.navigate(['/landingpage/signup']);
  }

  togglePasswordVisibility(event: MouseEvent) {
    // this.hide.set(!this.hide());
    // event.stopPropagation();
  }
}
