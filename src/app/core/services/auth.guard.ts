import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
      // TODO: remove unused imports and code.
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

  canActivate(
    // TODO: remove unused imports and code.
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // TODO: const always not let(unless you need it)
    let isLoggedIn = this.authService.isUserAuthenticated();
    if (isLoggedIn) {
      return true;
    } else {
      // TODO: / insteqad of landingpage
      this.router.navigate(['/landingpage']);
      return false;
    }
  }
}
