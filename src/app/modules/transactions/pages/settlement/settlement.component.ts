declare var Ext: any;

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GridEditableFormService } from '../../../../_services/grid-editable-form.service';
import { ListSettelementHeaders } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {

  @Select(TransactionsState.listSettelementHeaders)listSettelementHeaders$: Observable<any>;
  @Select(TransactionsState.getTransactionDetail) getTransactionDetail$: Observable<any>;

  grid: any;
  grid2: any;
  data_settlement = Ext.create('Ext.data.Store', {
    fields: [
      'Name',
            { name: 'Date', type: 'date', dateFormat: 'c' },
              ]
  });

   data_transaction = Ext.create('Ext.data.Store', {
    fields: [
    'Name',
          { name: 'Date', type: 'date', dateFormat: 'c' },
            ]
  });

  constructor(private readonly store: Store,
    private gridEditableFormService: GridEditableFormService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
     this.store.dispatch(new ListSettelementHeaders());
  }

  gridReady = (event) => {
        this.grid = event.cmp;
  }

  gridReady2 = (event) => {
        this.grid2 = event.cmp;
  }

}
