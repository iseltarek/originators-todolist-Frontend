import { Routes } from '@angular/router';
import { SignupComponent } from './features/components/signup/signup.component';
import { LoginComponent } from './features/components/login/login.component';
import { HomeComponent } from './features/pages/home/home.component';
import { AuthGuard } from './Core/services/gurds/auth.guard';
import { LandingPageComponent } from './features/pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: 'landingpage',
    component: LandingPageComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/landingpage' },
];
