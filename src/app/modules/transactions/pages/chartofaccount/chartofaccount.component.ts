declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListChartsOfAccount } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-chartofaccount',
  templateUrl: './chartofaccount.component.html',
  styleUrls: ['./chartofaccount.component.scss'],
})
export class ChartOfAccountComponent implements OnInit {
  @Select(TransactionsState.chartsOfAccount)
  listChartOfAccount$: Observable<any>;
  constructor(private readonly store: Store) {}
  stored: any;
  ngOnInit() {
    this.store.dispatch(new ListChartsOfAccount());
    this.listChartOfAccount$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        fields: ['Name', 'Code'],
        data: stateValue,
      });
    });
  }
}
