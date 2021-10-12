declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreateFixedAssetsSettings,
  CreateGeneralSettings, GetAccounts, ListAccounts,
  ListControlAccounts, ListCostCenter, ListCostCode, ListVoucherType
} from '../../store/action/setting.action';
import { SettingState } from '../../store/states/setting.state';
import {
  CostCode, FixedAssetSettings
} from './../../../../models/defaultSettings';


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
    formRef: any;
     formRef_2: any;


  // data_accounts: any;
    accounts_income = Ext.create('Ext.data.Store', {
    });
    data_accounts_closing = Ext.create('Ext.data.Store', {
    });
     data_accounts_gain = Ext.create('Ext.data.Store', {
    });
     data_accounts_loss = Ext.create('Ext.data.Store', {
    });
     data_accounts_cash = Ext.create('Ext.data.Store', {
    });
    data_voucher = Ext.create('Ext.data.Store', {
    });
    data_costCode = Ext.create('Ext.data.Store', {
    });
    data_controlAccount = Ext.create('Ext.data.Store', {
    });
    data_costCenter = Ext.create('Ext.data.Store', {
    });

    getCostData : CostCode;

  generalSettingsForm: FormGroup;
  fixedAssetSettingsForm: FormGroup;

    @Select(SettingState.listCostCode) listCostCode$: Observable<any>;
    @Select(SettingState.listCostCenter) listCostCenter$: Observable<any>;
    @Select(SettingState.getAccounts) getAccounts$: Observable<any>;
    @Select(SettingState.listAccounts) listAccounts$: Observable<any>;
    @Select(SettingState.listVoucherType) listVoucherType$: Observable<any>;
    @Select(SettingState.listControlAccounts) listControlAccounts$: Observable<any>;


  constructor(private readonly fb: FormBuilder, private readonly store: Store) {
    this.generalSettingsForm = this.fb.group({
      IncomeSummaryAccountId: [''],
      ClosingCapitalAccountId: [''],
      DefaultCostCenterId: [''],
      InterBranchControlAccountId: [''],
    });

    this.fixedAssetSettingsForm = this.fb.group({
      DefaultCostCenterId_2: [''],
      DefualtVoucherTypeId: [''],
      GainOnDisposalAccountId: [''],
      LossOnDisposalAccountId: [''],
      CashAccountIds: [''],
    });
  }
  ngOnInit(): void {
     this.store.dispatch(new ListControlAccounts());
     this.store.dispatch(new ListCostCode());
     this.store.dispatch(new ListVoucherType());
     this.store.dispatch(new ListCostCenter());
     this.store.dispatch(new ListAccounts());

     this.listCostCode$.subscribe((data) => {
       this.data_costCode.setData(data);
     })
     this.listVoucherType$.subscribe((data) => {
       this.data_voucher.setData(data);
     });
     this.listCostCenter$.subscribe((data) => {
       this.data_costCenter.setData(data);
     });
     this.listControlAccounts$.subscribe((data) => {
       this.data_controlAccount.setData(data);
     });

     this.listAccounts$.subscribe((data) => {
       this.accounts_income.setData(data);
       this.data_accounts_closing.setData(data);
       this.data_accounts_gain.setData(data);
       this.data_accounts_loss.setData(data);
       this.data_accounts_cash.setData(data);
     });


  }

  onReady = (event) => {
    this.formRef = event.cmp;

  }

  onReady_2 = (event) => {
    this.formRef_2 = event.cmp;

  }

  onChangeAccounts = ({ sender, newValue, oldValue }) => {

    this.getCostData = {
      Name : newValue,
    };
     this.store.dispatch(new GetAccounts(this.getCostData)).subscribe((stateValue) => {
      this.loadData(stateValue);
    });
  }

  loadData(result : any){
    this.getAccounts$.subscribe((data) => {
       this.accounts_income.setData(data);
     });
  }


  onSubmitGeneralSettingsForm(): void {
    if (this.generalSettingsForm.valid) {

      const formModel = this.formRef.nameRefs;

      let saveModel : any;

      saveModel = {
        IncomeSummaryAccountId : formModel.IncomeSummaryAccountId._value,
        ClosingCapitalAccountId : formModel.ClosingCapitalAccountId._value,
        DefaultCostCenterId : formModel.DefaultCostCenterId._value,
        InterBranchControlAccountId : formModel.InterBranchControlAccountId._value,
      }


      this.generalSettingsForm.markAsPristine();
      this.store
        .dispatch(new CreateGeneralSettings(saveModel))
        .subscribe(() => {});
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }

  onSubmitFixedAssetSettingsForm(): void {
    if (this.fixedAssetSettingsForm.valid) {

      const formModel = this.formRef_2.nameRefs;

      let saveModel : FixedAssetSettings;

      saveModel = {
        DefaultCostCenterId : formModel.DefaultCostCenterId_2._value,
        DefualtVoucherTypeId : formModel.DefualtVoucherTypeId._value,
        GainOnDisposalAccountId : formModel.GainOnDisposalAccountId._value,
        LossOnDisposalAccountId : formModel.LossOnDisposalAccountId._value,
        CashAccountId : formModel.CashAccountId._value,
      }

      this.fixedAssetSettingsForm.markAsPristine();
      this.store
        .dispatch(
          new CreateFixedAssetsSettings(saveModel)
        )

        .subscribe(() => {
          Ext.toast('Successfully added Fixed Asset Settings');
        });
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }
}
