import { Component } from '@angular/core';
import { MaterialssModule } from '../../../Core/services/material.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/services/services/auth.service.component';

@Component({
  selector: 'app-side-nav',
  imports: [MaterialssModule, RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  constructor(public authService: AuthService) {}
  LogUserOut() {
    this.authService.logout();
  }
}
