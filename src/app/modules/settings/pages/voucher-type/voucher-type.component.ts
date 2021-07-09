declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreateVoucherType,
  ListVoucherTypes,
  ListVoucherTypeSetting
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
  @Select(SettingState.voucherTypeSetting) voucherTypeSetting$: Observable<any>;

  voucherTypeForm: FormGroup;
  stored = Ext.create('Ext.data.Store', {

  });

  grid:any;

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



  ngOnInit() {
    this.store.dispatch(new ListVoucherTypeSetting());

    this.voucherTypeSetting$.subscribe((stateValue) => {
      this.stored.setData(stateValue);
    });
  }

   gridReady = (event) => {
      this.grid = event.cmp;
    }

    onSubmitVoucherTypeForm(): void {
    if (this.voucherTypeForm.valid) {
      this.voucherTypeForm.markAsPristine();
      this.store
        .dispatch(new CreateVoucherType(this.voucherTypeForm.value))
        .subscribe(() => {
          this.store.dispatch(new ListVoucherTypes());
        });
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }


}
