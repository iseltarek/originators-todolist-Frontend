import { Routes } from '@angular/router';
import { SignupComponent } from './features/components/signup/signup.component';
import { LoginComponent } from './features/components/login/login.component';
import { HomeComponent } from './features/pages/home/home.component';
import { AuthGuard } from './Core/services/gurds/auth.guard';
import { LandingPageComponentComponent } from './features/pages/landing-page-component/landing-page-component.component';

export const routes: Routes = [
  { path: 'landingpage', component: LandingPageComponentComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/landingpage' },
];
