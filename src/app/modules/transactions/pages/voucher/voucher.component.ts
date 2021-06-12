declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListVoucher } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
  @Select(TransactionsState.listVoucher)
  listVoucher$: Observable<any>;
  constructor(private readonly store: Store) {}
  stored: any;
  ngOnInit() {
    this.store.dispatch(new ListVoucher());
    this.listVoucher$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        fields: ['Amount', 'Code'],
        data: stateValue,
      });
    });
  }
}
