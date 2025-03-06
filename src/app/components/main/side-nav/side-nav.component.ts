import { Component } from '@angular/core';
import { MaterialssModule } from '../../../core/services/material.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/services/auth.service.component';

@Component({
  selector: 'app-side-nav',
  imports: [MaterialssModule, RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  // TODO: authService: authenticationService
  constructor(public authService: AuthService) {}
  // TODO: LogUserOut: logout
  LogUserOut() {
    this.authService.logout();
  }
}
