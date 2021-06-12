declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherData';
import { ListVoucher } from '../../store/action/transactions.action';
@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss'],
})
export class VoucherListComponent implements OnInit {
  constructor(private readonly stored: Store) {}
  store = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {
    this.stored.dispatch(new ListVoucher());
  }
}
