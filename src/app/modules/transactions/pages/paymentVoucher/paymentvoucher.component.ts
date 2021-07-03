declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreatePaymentVoucher,
  listPaymentVoucher,
} from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-paymentvoucher',
  templateUrl: './paymentvoucher.component.html',
  styleUrls: ['./paymentvoucher.component.scss'],
})
export class PaymentVoucherComponent implements OnInit {
  @Select(TransactionsState.listPaymentVoucher)
  listPaymentVoucher$: Observable<any>;
  paymentVoucherForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly store: Store) {
    this.paymentVoucherForm = this.fb.group({
      VoucherType: [''],
      Date: [''],
      AuthorizedDate: [''],
      Amount: [''],
      PaidTo: [''],
      Purpose: [''],
      Description: [''],
      Account: [''],
      ModeOfPayment: [''],
      Project: [''],
    });
  }
  onSubmitPaymentVoucherForm(): void {
    if (this.paymentVoucherForm.valid) {
      this.paymentVoucherForm.markAsPristine();
      this.store
        .dispatch(new CreatePaymentVoucher(this.paymentVoucherForm.value))
        .subscribe(() => {
          this.store.dispatch(new listPaymentVoucher());
        });
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }
  stored: any;
  ngOnInit() {
    this.store.dispatch(new listPaymentVoucher());
    this.listPaymentVoucher$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        data: stateValue,
      });
    });
  }
}
