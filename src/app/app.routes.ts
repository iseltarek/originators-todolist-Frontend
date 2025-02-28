import { Routes } from '@angular/router';
import { SignupComponent } from './components/Auth/signup/signup.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { LandingPageComponentComponent } from './components/pages/landing-page-component/landing-page-component.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
  { path: 'landingpage', component: LandingPageComponentComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' },
];
