declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      incomeSummeryAccount: ['', Validators.required],
      closingCapitalAccount: [''],
      defaultCostCenter: [''],
      interBranchControlAccount: [''],
    });

    this.fixedAssetSettingsForm = this.fb.group({
      defaultCostCenter: ['', Validators.required],
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
      this.store
        .dispatch(new CreateGeneralSettings(this.generalSettingsForm.value))
        .subscribe(() => {
          Ext.toast('Successfully added General Settings');
        });
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }

  onSubmitFixedAssetSettingsForm(): void {
    if (this.fixedAssetSettingsForm.valid) {
      this.fixedAssetSettingsForm.markAsPristine();
      this.store
        .dispatch(
          new CreateFixedAssetsSettings(this.fixedAssetSettingsForm.value)
        )

        .subscribe(() => {
          Ext.toast('Successfully added Fixed Asset Settings');
        });
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }
}
