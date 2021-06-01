import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { TransactionsApiService } from './apis/transactions.api.service';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { TransactionsState } from './store/states/transactions.state';
import { TransactionsRoutingModule } from './transactions.routing';
@NgModule({
  declarations: [VoucherComponent],
  imports: [
    NgxsModule.forFeature([TransactionsState]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ExtAngularModernModule,
  ],
  exports: [],
  providers: [TransactionsApiService],
})
export class TransactionsModule {}
