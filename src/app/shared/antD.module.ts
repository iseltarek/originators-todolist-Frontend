import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  imports: [
    NzDatePickerModule,
    NzDropDownModule,
    NzCardModule,
    NzProgressModule,
    NzTagModule,
    NzAvatarModule,
    NzMenuModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzBadgeModule,
    NzModalModule,
  ],
  exports: [
    NzDatePickerModule,
    NzDropDownModule,
    NzCardModule,
    NzProgressModule,
    NzTagModule,
    NzAvatarModule,
    NzMenuModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzBadgeModule,
    NzModalModule,
  ],
})
export class AntdModule {}
