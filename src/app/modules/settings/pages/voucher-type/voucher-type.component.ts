declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreateVoucherType,
  ListVoucherTypes,
} from '../../store/action/setting.action';
import { SettingState } from '../../store/states/setting.state';
import { VoucherType } from './../../../../models/defaultSettings';
@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.scss'],
})
export class VoucherTypeComponent implements OnInit {
  @Select(SettingState.voucherType) listCostCode$: Observable<VoucherType>;
  voucherTypeForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly store: Store) {
    this.voucherTypeForm = this.fb.group({
      costCenter: [''],
      voucherType: [''],
      defaultAccount: [''],
      balanceSide: [''],
      startingNumber: [''],
      endingNumber: [''],
      currentNumber: [''],
      numberOfDigits: [''],
    });
  }
  onSubmitVoucherTypeForm(): void {
    if (this.voucherTypeForm.valid) {
      this.voucherTypeForm.markAsPristine();
      this.store
        .dispatch(new CreateVoucherType(this.voucherTypeForm.value))
        .subscribe(() => {
          Ext.toast('Successfully added Voucher Type');
          this.store.dispatch(new ListVoucherTypes());
        });
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }
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
