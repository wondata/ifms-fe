declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { listFinancialTransaction } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-financialtransaction',
  templateUrl: './financialtransactions.component.html',
  styleUrls: ['./financialtransactions.component.scss'],
})
export class FinancialTransactionComponent implements OnInit {
  @Select(TransactionsState.listFinancialTransaction)
  listFinancialTransaction$: Observable<any>;
  constructor(private readonly store: Store) {}
  stored: any;
  ngOnInit() {
    this.store.dispatch(new listFinancialTransaction());
    this.listFinancialTransaction$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        fields: ['Name', 'Code'],
        data: stateValue,
      });
    });
  }
}
