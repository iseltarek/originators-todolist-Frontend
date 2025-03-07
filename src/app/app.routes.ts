import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LandingPageComponentComponent } from './components/pages/landing-page-component/landing-page-component.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuard } from './Core/services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'landingpage', component: LandingPageComponentComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/landingpage' },
];
