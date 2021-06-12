import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CostCodePageComponent } from './pages/cost-code/cost-code.component';
import { DefaultSettingComponent } from './pages/default-setting/default-setting.component';
import { VoucherTypeComponent } from './pages/voucher-type/voucher-type.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultSettingComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
  {
    path: 'costcode',
    component: CostCodePageComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
  {
    path: 'vouchertype',
    component: VoucherTypeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
