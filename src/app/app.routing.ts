import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { LayoutDefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VoucherComponent } from './modules/transactions/pages/voucher/voucher.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'settings',
    component: LayoutDefaultComponent,
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (mod) => mod.SettingsModule
      ),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
  {
    path: 'transactions',
    component: LayoutDefaultComponent,
    loadChildren: () =>
      import('./modules/transactions/transactions.module').then(
        (mod) => mod.TransactionsModule
      ),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
