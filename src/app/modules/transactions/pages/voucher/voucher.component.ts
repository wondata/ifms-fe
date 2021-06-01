declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherData';
import { ListVoucher } from '../../store/action/transactions.action';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
  constructor(private readonly stored: Store) {}
  store = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {
    this.stored.dispatch(new ListVoucher());
  }
}
