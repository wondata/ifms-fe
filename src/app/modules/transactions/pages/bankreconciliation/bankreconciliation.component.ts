declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { listBankReconciliation } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-bankreconciliation',
  templateUrl: './bankreconciliation.component.html',
  styleUrls: ['./bankreconciliation.component.scss'],
})
export class BankReconciliationComponent implements OnInit {
  @Select(TransactionsState.listBankReconciliation)
  listBankReconciliation$: Observable<any>;
  constructor(private readonly store: Store) {}
  stored: any;
  ngOnInit() {
    this.store.dispatch(new listBankReconciliation());
    this.listBankReconciliation$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        fields: ['Name', 'Code'],
        data: stateValue,
      });
    });
  }
}
