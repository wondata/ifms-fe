declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListVoucherTypes } from '../../store/action/setting.action';
import { SettingState } from '../../store/states/setting.state';
import { VoucherType } from './../../../../models/defaultSettings';
@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.scss'],
})
export class VoucherTypeComponent implements OnInit {
  @Select(SettingState.voucherType) listCostCode$: Observable<VoucherType>;
  constructor(private readonly store: Store) {}
  stored: any;
  ngOnInit() {
    this.store.dispatch(new ListVoucherTypes());
    this.listCostCode$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        fields: [
          'CostCenter',
          'VoucherType',
          'DefaultAccount',
          'AccountTitle',
          'BalanceSide',
          'StartingNumber',
          'CurrentNumber',
          'NumberOfDigits',
        ],
        data: stateValue,
      });
    });
  }
}
