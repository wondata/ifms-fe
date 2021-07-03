declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ListVoucher } from '../../store/action/transactions.action';
@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss'],
})
export class VoucherDetailComponent implements OnInit {
  constructor(private readonly stored: Store) {}
  store = Ext.create('Ext.data.Store', {
    // data: gridData,
  });

  ngOnInit() {
    this.stored.dispatch(new ListVoucher());
  }
}
