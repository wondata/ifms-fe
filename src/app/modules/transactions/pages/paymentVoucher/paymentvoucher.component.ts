declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { VoucherHeader } from 'src/app/models/defaultSettings';
import { GridEditableFormService } from '../../../../_services/grid-editable-form.service';
import {
  CreatePaymentVoucher, DeletePaymentVoucher, GetLookups,
  ListAccounts, ListCostCenter, listPaymentVoucher,
  ListPaymentVoucherType, ListPurposeTemplates
} from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';

@Component({
  selector: 'app-paymentvoucher',
  templateUrl: './paymentvoucher.component.html',
  styleUrls: ['./paymentvoucher.component.scss'],
})
export class PaymentVoucherComponent implements OnInit {
    @Select(TransactionsState.listPaymentVoucher) listPaymentVoucher$: Observable<any>;
    @Select(TransactionsState.listPurposeTemplates) listPurposeTemplates$: Observable<any>;
    @Select(TransactionsState.listPaymentVoucherType) listPaymentVoucherType$: Observable<any>;
    @Select(TransactionsState.listAccounts) listAccounts$: Observable<any>;
    @Select(TransactionsState.getLookups) getLookups$: Observable<any>;
    @Select(TransactionsState.listCostCenter) listCostCenter$: Observable<any>;

    paymentVoucherForm: FormGroup;

    stored = Ext.create('Ext.data.Store', {
       fields: [
        'Name',
        { name: 'Date', type: 'date', dateFormat: 'c' },
              ],
    });

    grid : any;
    formRef : any;
    editablePlugin : any;

    voucherEditor : any;
    voucherOptions : any;

    accountEditor : any;
    accountOptions : any;

    purposeEditor : any;
    purposeOptions : any;

    descriptionEditor : any;
    descriptionOptions : any;

    modePaymentEditor : any;
    modePaymenteOptions : any;

    costCenterEditor : any;
    costCenterOptions : any;

    constructor(
      private readonly fb: FormBuilder,
      private readonly store: Store,
      private gridEditableFormService: GridEditableFormService) {
        this.paymentVoucherForm = this.fb.group({
          VoucherType: [''],
          Date: [''],
          AuthorizedDate: [''],
          Amount: [''],
          PaidTo: [''],
          Purpose: [''],
          Description: [''],
          Account: [''],
          ModeOfPayment: [''],
          Project: [''],
        });
    }

    ngOnInit() {
      this.store.dispatch(new listPaymentVoucher());
      this.store.dispatch(new ListAccounts());
      this.store.dispatch(new ListPurposeTemplates());
      this.store.dispatch(new ListPaymentVoucherType());
      this.store.dispatch(new ListCostCenter());
      this.store.dispatch(new GetLookups('lupModeOfPayment'));

        this.getLookups()
    }

    getLookups(){
        this.listPaymentVoucher$.subscribe((stateValue) => {
           this.stored.setData(stateValue);
        });
        this.listPaymentVoucherType$.subscribe((data) => {
            this.voucherOptions = data;
            this.voucherEditor = { xtype: 'selectfield', options: data };
        });
        this.listPurposeTemplates$.subscribe((data) => {
            this.purposeOptions = data;
            this.purposeEditor = { xtype: 'selectfield', options: data };
        });
        this.listAccounts$.subscribe((data) => {
            this.accountOptions = data;
            this.accountEditor = { xtype: 'selectfield', options: data };
        });
        this.getLookups$.subscribe((data) => {
          this.modePaymenteOptions = data;
          this.modePaymentEditor = {
            xtype: 'selectfield',
            options: data,
            editable: true,
           listeners : {
                // change : function(field, newValue) {
                //   debugger;
                //     console.log(newValue);
                // },
                // change: this.onChange(this.formRef.event)
            }
          };
        });
        this.listCostCenter$.subscribe((data) => {
            this.costCenterOptions = data;
            this.costCenterEditor = { xtype: 'selectfield', options: data };
        });

    }

  onGridReady = function (event) {
      this.grid = event.cmp;
      this.editablePlugin = this.grid.getPlugins()[0]; // editablegrid is index 2 in plugins array of this grid

      let component = this;
      this.editablePlugin.onSubmitTap = Ext.Function.createInterceptor(this.editablePlugin.onSubmitTap, function (name) {
        component.savePaymentVoucher(this.form.getValues());
        this.sheet.hide();
        return false; // return false if you don't want the default submit operation to be executed
      });

  };

  onChange = ({ sender, newValue, oldValue }) => {
    debugger;
  };

  savePaymentVoucher(params: any) {

    // debugger
    this.store.dispatch(new CreatePaymentVoucher(params))
      .subscribe(() => {
        this.store.dispatch(new listPaymentVoucher());
      });

  }


    onChilddoubletap = ({ sender, location  }) => {
      this.gridEditableFormService.openGridEditableForm(this.grid, this.stored, location.recordIndex, this.editablePlugin);

    }


    onReady = (event) => {
        this.formRef = event.cmp;
    }

    gridReady = (event) => {
        this.grid = event.cmp;

    }

    onAdd = function() {
      const newModel = {} as VoucherHeader;
      let index = 0;
      this.stored.insert(index, newModel);
      // this.modePaymentEditor.on("change", this.onChange);
      this.gridEditableFormService.openGridEditableForm(this.grid, this.stored, index, this.editablePlugin);
      debugger

    };


    deletePaymentVoucher = (grid, info) => {
      let cmp = this;
      Ext.Msg.show({
        title: 'Confirmation',
        message: 'Are you sure you want to delete the selected record ?',
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
        fn(answer) {
          if (answer === 'yes') {
            const record = info.record;
            const { id, ...selectedRecord } = record.data;

            cmp.store.dispatch(new DeletePaymentVoucher(selectedRecord))
              .subscribe(() => {
                cmp.store.dispatch(new listPaymentVoucher());
              });

          } else {
            return;
          }
        }
      });
  }

   renderColumn = (value, record, dataIndex, cell, column) => {
    var selectedRecord;
    if (dataIndex === "VoucherTypeId") {
      selectedRecord = this.voucherOptions?.find(i => i.value === value);
    }else if (dataIndex === "PurposeTemplateId") {
      selectedRecord = this.purposeOptions?.find(i => i.value === value);
    }else if(dataIndex === "CostCenterId"){
      selectedRecord = this.costCenterOptions?.find(i => i.value === value);
    }

    if (selectedRecord !== undefined) {
      return selectedRecord.text;
    }

    return value;
  }

  renderBoolean = (value) => {

    if (value) {
      return "<p class='x-fa fa-check' style='color:green;text-align:center;font-size: 18px;'></p> ";
    }
    else {
      return "<p class='x-fa fa-times' style='color:#f44336;text-align:center;font-size: 18px;'></p> ";
    }
  }
  renderSign = (value) =>  {
    var formattedValue = Ext.util.Format.currency(value, 'ETB ');
   return formattedValue;
  }
}
