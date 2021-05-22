declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherTypeData';
import { ListVoucherTypes } from '../../store/action/setting.action';
@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.scss'],
})
export class VoucherTypeComponent implements OnInit {
  constructor(private readonly stored: Store) {}
  store = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {
    this.stored.dispatch(new ListVoucherTypes());
  }
}
