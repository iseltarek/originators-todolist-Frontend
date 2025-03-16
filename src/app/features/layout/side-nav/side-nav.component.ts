import { Component } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Core/services/services/auth.service.component';
import { AntdModule } from '../../../shared/antD.module';

@Component({
  selector: 'app-side-nav',
  imports: [MaterialssModule, RouterLink, AntdModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.less',
})
export class SideNavComponent {
  constructor(public authenticationService: AuthService) {}
  logout() {
    this.authenticationService.logout();
  }
}
