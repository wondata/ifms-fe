declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListVoucher } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss'],
})
export class VoucherListComponent implements OnInit {
    @Select(TransactionsState.listVoucher) listVoucher$: Observable<any>;
    constructor(private readonly store: Store) {}
    // stored: any;

    stored = Ext.create('Ext.data.Store', {
       extend: 'Ext.data.Model',
      fields: [
          'Name',
      ],

      hasMany: {model: 'VoucherType', name: 'CostCenter'},
    });
  ngOnInit() {
    this.store.dispatch(new ListVoucher());
    // this.listVoucher$.subscribe((stateValue: any) => {
    //   this.stored = Ext.create('Ext.data.Store', {
    //     fields: ['Amount', 'Code'],
    //     data: stateValue,
    //   });
    // });
    this.listVoucher$.subscribe((data) => {
      this.stored.setData(data);
    })
    // debugger

  }

  renderSign = (value) =>  {
    var col = ''
    if(value == "True") {col = 'green'}
    else if(value == "False" ) {col = 'red'}
    return `<span style='color:${col}'>${value}</span>`
    return
  }
  grid:any;
  gridReady = (event) => {
    this.grid = event.cmp;
  }
}
