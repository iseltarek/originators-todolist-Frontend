import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AntdModule } from '../../modules/antd.module';

@Component({
  selector: 'app-landing-page',
  imports: [RouterOutlet, AntdModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.less',
})
export class LandingPageComponent {}
