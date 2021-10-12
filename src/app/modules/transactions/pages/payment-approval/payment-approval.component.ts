declare var Ext: any;

import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TransactionsState } from '../../store/states/transactions.state';

@Component({
  selector: 'app-payment-approval',
  templateUrl: './payment-approval.component.html',
  styleUrls: ['./payment-approval.component.scss']
})
export class PaymentApprovalComponent implements OnInit {

  @Select(TransactionsState.listPaymentHeaders) listPaymentHeaders$: Observable<any>;

    data_paymentHeaders = Ext.create('Ext.data.Store', {
    });

    formRef : any;


  constructor(private readonly store: Store ) { }

  ngOnInit(): void {
  }

  onPreview = (event) => {

    }

  onSave = (event) => {

    }

}
