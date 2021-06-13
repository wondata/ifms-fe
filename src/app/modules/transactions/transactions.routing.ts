import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { BankReconciliationComponent } from './pages/bankreconciliation/bankreconciliation.component';
import { ChartOfAccountComponent } from './pages/chartofaccount/chartofaccount.component';
import { CollectionVoucherComponent } from './pages/collectionvoucher/collectionvoucher.component';
import { FinancialTransactionComponent } from './pages/financialtransactions/financialtransactions.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
const routes: Routes = [
  {
    path: '',
    component: VoucherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
  {
    path: 'financialtransactions',
    component: FinancialTransactionComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
  {
    path: 'chartsofaccount',
    component: ChartOfAccountComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
  {
    path: 'collectionvoucher',
    component: CollectionVoucherComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
  {
    path: 'bankreconciliation',
    component: BankReconciliationComponent,
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
export class TransactionsRoutingModule {}
