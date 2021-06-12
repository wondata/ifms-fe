import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CashierPageComponent } from './pages/cashier/cashier.component';
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
  {
    path: 'cashier',
    component: CashierPageComponent,
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
