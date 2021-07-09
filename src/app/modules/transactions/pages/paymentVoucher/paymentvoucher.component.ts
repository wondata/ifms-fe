declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreatePaymentVoucher,
  listPaymentVoucher
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

    stored = Ext.create('Ext.data.Store', {

      });
    grid : any;
    formRef : any;

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

    ngOnInit() {
      this.store.dispatch(new listPaymentVoucher());

      this.listPaymentVoucher$.subscribe((stateValue) => {
        this.stored.setData(stateValue);
      });
    }

    gridReady = (event) => {
        this.grid = event.cmp;
      }

    onReady = (event) => {
        this.formRef = event.cmp;

    }
    onChilddoubletap = ({  sender, location }) => {
        const record = location.record;
        const {id , ...selectedRecord} = record.data;

        //  this.store.dispatch(new GetVoucherHeaderDetail(selectedRecord))
        //   .subscribe((result) => {
        //     this.loadForm(result);
        //   });

      }
}
