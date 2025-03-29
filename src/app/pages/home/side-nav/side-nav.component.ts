import { Component, Input } from '@angular/core';
import { MaterialssModule } from '../../../modules/material.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service.component';
import { AntdModule } from '../../../modules/antd.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  imports: [MaterialssModule, AntdModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.less',
})
export class SideNavComponent {
  @Input() isCollapsed: boolean = false;
  constructor(public authenticationService: AuthService) {}
  logout() {
    this.authenticationService.logout();
  }
}
