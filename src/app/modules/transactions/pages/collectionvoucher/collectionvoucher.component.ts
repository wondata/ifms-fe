declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PaymentVoucher } from 'src/app/models/defaultSettings';
import { GridEditableFormService } from '../../../../_services/grid-editable-form.service';
import {
  CreateCollectionVoucher, DeleteCollectionVoucher, GetLookups, ListAccounts, listCollectionVoucher, ListCollectionVoucherType, ListCostCenter, ListPurposeTemplates
} from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-collectionvoucher',
  templateUrl: './collectionvoucher.component.html',
  styleUrls: ['./collectionvoucher.component.scss'],
})
export class CollectionVoucherComponent implements OnInit {
    @Select(TransactionsState.listCollectionVoucher) listCollectionVoucher$: Observable<any>;
    @Select(TransactionsState.listAccounts) listAccounts$: Observable<any>;
    @Select(TransactionsState.getLookups) getLookups$: Observable<any>;
    @Select(TransactionsState.listCostCenter) listCostCenter$: Observable<any>;
    @Select(TransactionsState.listCollectionVoucherType) listCollectionVoucherType$: Observable<any>;
    @Select(TransactionsState.listPurposeTemplates) listPurposeTemplates$: Observable<any>;

    collectionVoucherForm: FormGroup;
    formRef:any;
    grid:any;
    editablePlugin : any;

    stored = Ext.create('Ext.data.Store', {
      fields: [
      'Name',
            { name: 'Date', type: 'date', dateFormat: 'c' },
          ]
    });

    disabled:boolean = false;

    accountEditor : any;
    accountOptions : any;

    voucherEditor : any;
    voucherOptions : any;

    purposeEditor : any;
    purposeOptions : any;

    descriptionEditor : any;
    descriptionOptions : any;

    modePaymentEditor : any;
    modePaymenteOptions : any;

    projectEditor : any;
    projectOptions : any;


  constructor(private readonly fb: FormBuilder,
    private gridEditableFormService: GridEditableFormService,
    private readonly store: Store) {
    this.collectionVoucherForm = this.fb.group({
      VoucherType: [''],
      Date: [''],
      AuthorizedDate: [''],
      Amount: [''],
      PaidTo: [''],
      Purpose: [''],
      Description: [''],
      Account: [''],
      ModeOfPayment: [''],
      ReceivedFrom: [''],
      Project: [''],
    });
  }



    ngOnInit() {
      this.store.dispatch(new listCollectionVoucher());
      this.store.dispatch(new ListAccounts());
      this.store.dispatch(new GetLookups('lupModeOfPayment'));
      this.store.dispatch(new ListCollectionVoucherType());
      this.store.dispatch(new ListPurposeTemplates());
      this.store.dispatch(new ListCostCenter());

      this.getLookups();
    }

    getLookups(){
      this.listCollectionVoucher$.subscribe((stateValue) => {
        this.stored.setData(stateValue);
      });

      this.listCollectionVoucherType$.subscribe((data) => {
          this.voucherOptions = data;
          this.voucherEditor = { xtype: 'selectfield', options: data };
        });

      this.listAccounts$.subscribe((data) => {
          this.accountOptions = data;
          this.accountEditor = { xtype: 'selectfield', options: data };
        });

      this.getLookups$.subscribe((data) => {
          this.modePaymenteOptions = data;
          this.modePaymentEditor = { xtype: 'selectfield', options: data };
        });

      this.listCostCenter$.subscribe((data) => {
            this.projectOptions = data;
            this.projectEditor = { xtype: 'selectfield', options: data };
        });

      this.listPurposeTemplates$.subscribe((data) => {
          this.purposeOptions = data;
          this.purposeEditor = { xtype: 'selectfield', options: data };
      });
    }

    onGridReady = function (event) {
      this.grid = event.cmp;
      this.editablePlugin = this.grid.getPlugins()[0]; // editablegrid is index 2 in plugins array of this grid

      let component = this;

      this.editablePlugin.onSubmitTap = Ext.Function.createInterceptor(this.editablePlugin.onSubmitTap, function (name) {
        component.saveCollectionVoucher(this.form.getValues());
        this.sheet.hide();
        return false; // return false if you don't want the default submit operation to be executed
      });
    };

    onAdd = function() {
      const newModel = {} as PaymentVoucher;
      let index = 0;
      this.stored.insert(index, newModel);

      this.gridEditableFormService.openGridEditableForm(this.grid, this.stored, index, this.editablePlugin);
    };

    saveCollectionVoucher(params: any) {
      debugger
      this.store.dispatch(new CreateCollectionVoucher(params))
        .subscribe(() => {
          this.store.dispatch(new listCollectionVoucher());
        });
    }

    onChilddoubletap = ({ sender, location  }) => {

      this.gridEditableFormService.openGridEditableForm(this.grid, this.stored, location.recordIndex, this.editablePlugin);
    }

    deleteCollectionVoucher = (grid, info) => {
      let cmp = this;
      debugger
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

            cmp.store.dispatch(new DeleteCollectionVoucher(selectedRecord))
              .subscribe(() => {
                cmp.store.dispatch(new listCollectionVoucher());
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
      }else if (dataIndex === "PurposeTemplateId") {
        selectedRecord = this.purposeOptions?.find(i => i.value === value);
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


    onReady = (event) => {
        this.formRef = event.cmp;

    }

    gridReady = (event) => {
        this.grid = event.cmp;
    }

    renderSign = (value) =>  {
        var col = ''
        if(value == "True") {col = 'green'}
        else if(value == "False" ) {col = 'red'}
          return `<span style='color:${col}'>${value}</span>`
    }

    toggleDisabled = (event) => {
        this.disabled = !this.disabled;
    }

    reset = (event) => this.formRef.reset();

}
