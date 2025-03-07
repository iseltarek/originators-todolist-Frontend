import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isUserAuthenticated();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
