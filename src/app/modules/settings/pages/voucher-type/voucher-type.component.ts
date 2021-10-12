declare var Ext: any;

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GridEditableFormService } from '../../../../_services/grid-editable-form.service';
import {
  CreateVoucherType, GetLookups, ListAccounts,
  ListCostCenter, ListVoucherType, ListVoucherTypeSetting, DeleteVoucherType,
} from '../../store/action/setting.action';
import { SettingState } from '../../store/states/setting.state';
import { VoucherType } from './../../../../models/defaultSettings';

Ext.require([
  'Ext.grid.plugin.*',
]);

@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.scss'],
})

export class VoucherTypeComponent implements OnInit {

  @Select(SettingState.listCostCode) listCostCode$: Observable<VoucherType>;
  @Select(SettingState.voucherTypeSetting) voucherTypeSetting$: Observable<any>;
  @Select(SettingState.dataVoucherType) dataVoucherType$: Observable<any>;
  @Select(SettingState.listVoucherType) listVoucherType$: Observable<any>;
  @Select(SettingState.getLookups) getLookups$: Observable<any>;
  @Select(SettingState.listCostCenter) listCostCenter$: Observable<any>;
  @Select(SettingState.listAccounts) listAccounts$: Observable<any>;

  voucherTypeForm: FormGroup;
  gridStore = Ext.create('Ext.data.Store', {

  });

  grid:any;
  editablePlugin: any;
  voucherEditor : any;
  balanceEditor : any;
  voucherOptions : any;
  balanceOptions : any;
  costCenterEditor : any;
  costCenterOptions : any;

  defaultAccountEditor : any;
  defaultAccountOptions : any;

  constructor(private readonly fb: FormBuilder, private readonly store: Store,
    private gridEditableFormService: GridEditableFormService) {
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
      this.gridStore.setData(stateValue);
    });

    this.getLookups();

  }

  getLookups(){

     this.store.dispatch(new ListVoucherType());
     this.store.dispatch(new ListCostCenter());
     this.store.dispatch(new ListAccounts());
     this.store.dispatch(new GetLookups('lupBalanceSide'));

     this.listVoucherType$.subscribe((data) => {
        this.voucherOptions = data;
        this.voucherEditor = { xtype: 'selectfield', options: data };
    });
    this.getLookups$.subscribe((data) => {
        this.balanceOptions = data;
        this.balanceEditor = { xtype: 'selectfield', options: data };
    });
    this.listCostCenter$.subscribe((data) => {
        this.costCenterOptions = data;
        this.costCenterEditor = { xtype: 'selectfield', options: data };
    });
     this.listAccounts$.subscribe((data) => {
        this.defaultAccountOptions = data;
        this.defaultAccountEditor = { xtype: 'selectfield', options: data };
    });


    }

  onGridReady = function (event) {
      this.grid = event.cmp;
      this.editablePlugin = this.grid.getPlugins()[0]; // editablegrid is index 2 in plugins array of this grid

      let component = this;

      this.editablePlugin.onSubmitTap = Ext.Function.createInterceptor(this.editablePlugin.onSubmitTap, function (name) {
        component.saveVoucherTypeSetting(this.form.getValues());
        this.sheet.hide();
        return false; // return false if you don't want the default submit operation to be executed
      });
  };

  onChilddoubletap = ({ sender, location  }) => {

      this.gridEditableFormService.openGridEditableForm(this.grid, this.gridStore, location.recordIndex, this.editablePlugin);
  }


  gridReady = (event) => {
      this.grid = event.cmp;
  }

  onAdd = function() {
      const newModel = {} as VoucherType;
      let index = 0;
      this.gridStore.insert(index, newModel);

      this.gridEditableFormService.openGridEditableForm(this.grid, this.gridStore, index, this.editablePlugin);
  };

  saveVoucherTypeSetting(params: any) {

    this.store.dispatch(new CreateVoucherType(params))
      .subscribe(() => {
        this.store.dispatch(new ListVoucherType());
      });

  }

  onDelete = (grid, info) => {
    let cmp = this;

    Ext.Msg.show({
      title: "Confirmation",
      message: "Are you sure you want to delete the selected record ?",
      buttonAlign: 'right',
      buttons: Ext.MessageBox.YESNO,
      buttonToolbar: {
        xtype: 'toolbar',
        itemId: 'buttonToolbar',
        docked: 'bottom',
        defaultType: 'button',
        weighted: true,
        ui: 'footer',
        defaultButtonUI: '',
        layout: {
          type: 'box',
          vertical: false,
          pack: 'center'
        }
      },
      fn: function (answer) {
        if (answer === "yes") {
          let record = info.record;
          //exclude the id property which is generated by extAngular
          const { id, ...selectedRecord } = record.data;
          // debugger;
           cmp.store.dispatch(new DeleteVoucherType(selectedRecord))
              .subscribe(() => {
                cmp.store.dispatch(new ListVoucherType());
              });

        } else {
          return;
        }
      }
    });

  }

  renderColumn = (value, record, dataIndex, cell, column) => {
// debugger
    var selectedRecord;
    if (dataIndex === "VoucherTypeId") {
      selectedRecord = this.voucherOptions?.find(i => i.value === value);
    }else if (dataIndex === "BalanceSideId") {
      selectedRecord = this.balanceOptions?.find(i => i.value === value);
    }else if (dataIndex === "CostCenterId") {
      selectedRecord = this.costCenterOptions?.find(i => i.Id === value);
    }else if (dataIndex === "DefaultAccountId") {
      selectedRecord = this.defaultAccountOptions?.find(i => i.value === value);
    }

    if (selectedRecord !== undefined) {
      return selectedRecord.text;
    }

    return value;
  }


}
