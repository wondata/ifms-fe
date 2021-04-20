declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  CreateFixedAssetsSettings,
  CreateGeneralSettings,
} from '../../store/action/setting.action';

@Component({
  selector: 'app-default-setting',
  templateUrl: './default-setting.component.html',
  styleUrls: ['./default-setting.component.scss'],
})
export class DefaultSettingComponent implements OnInit {
  isPhone = Ext.os.is.Phone;
  top = !this.isPhone ? '10' : null;
  left = !this.isPhone ? '10' : null;
  width = !this.isPhone ? '400' : null;
  height = !this.isPhone ? '600' : null;
  disabled: boolean = false;

  generalSettingsForm: FormGroup;
  fixedAssetSettingsForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly store: Store) {
    this.generalSettingsForm = this.fb.group({
      incomeSummeryAccount: [''],
      closingCapitalAccount: [''],
      defaultCostCenter: [''],
      interBranchControlAccount: [''],
    });

    this.fixedAssetSettingsForm = this.fb.group({
      defaultCostCenter: [''],
      defaultVoucherType: [''],
      gainOnDisposalAccount: [''],
      lossOnDisposalAccount: [''],
      cashAccount: [''],
    });
  }
  ngOnInit(): void {}

  onSubmitGeneralSettingsForm(): void {
    if (this.generalSettingsForm.valid) {
      this.generalSettingsForm.markAsPristine();
      this.store.dispatch(
        new CreateGeneralSettings(this.generalSettingsForm.value)
      );
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }

  onSubmitFixedAssetSettingsForm(): void {
    if (this.fixedAssetSettingsForm.valid) {
      this.fixedAssetSettingsForm.markAsPristine();
      this.store.dispatch(
        new CreateFixedAssetsSettings(this.fixedAssetSettingsForm.value)
      );
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }
}
