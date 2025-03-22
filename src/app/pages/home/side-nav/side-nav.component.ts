import { Component } from '@angular/core';
import { MaterialssModule } from '../../../modules/material.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service.component';
import { AntdModule } from '../../../modules/antd.module';

@Component({
  selector: 'app-side-nav',
  imports: [MaterialssModule, AntdModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.less',
})
export class SideNavComponent {
  constructor(public authenticationService: AuthService) {}
  logout() {
    this.authenticationService.logout();
  }
}
