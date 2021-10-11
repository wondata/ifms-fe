declare var Ext: any;
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { VoucherHeader } from 'src/app/models/defaultSettings';
import { GridEditableFormService } from '../../../../_services/grid-editable-form.service';
import {
  AdjustTransaction, DeleteTransaction, GetJVNumber, GetTransactionDetail, listFinancialTransaction,
  PostTransaction, UnPostTransaction, VoidTransaction
} from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';

@Component({
  selector: 'app-financialtransaction',
  templateUrl: './financialtransactions.component.html',
  styleUrls: ['./financialtransactions.component.scss'],
})
export class FinancialTransactionComponent implements OnInit {
  @Select(TransactionsState.listFinancialTransaction)listFinancialTransaction$: Observable<any>;
  @Select(TransactionsState.getTransactionDetail) getTransactionDetail$: Observable<any>;
  stored = Ext.create('Ext.data.Store', {
    fields: [
    'Name',
          { name: 'Date', type: 'date', dateFormat: 'c' },
            ]
  });

  financial_store = Ext.create('Ext.data.Store', {

  });
    isDialogShowing: boolean = false;
    showDialog = () => {this.isDialogShowing = true;this.cd.detectChanges();}
    onOk = () => {this.isDialogShowing = false;this.cd.detectChanges();}
    onCancel = () => {this.isDialogShowing = false;this.cd.detectChanges();}
    onHide = () => {this.isDialogShowing = false;this.cd.detectChanges();}

  selectedTransaction: VoucherHeader [] = [];

    selectable:any = {
      columns: true,
      cells: false,
      checkbox: true,
      drag: true,
      extensible: 'both'
    }

    formRef:any;
    form: any;
    grid:any;
    grid2 : any;
    grid3 : any;
    editablePlugin : any;
    financialForm: FormGroup;

  constructor(private readonly store: Store,
    private gridEditableFormService: GridEditableFormService,
    private cd: ChangeDetectorRef) {}

    ngOnInit() {
      this.store.dispatch(new listFinancialTransaction());
      this.getLookups();
    }

    getLookups(){
      this.listFinancialTransaction$.subscribe((stateValue) => {
        this.stored.setData(stateValue);
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

    gridReady2 = (event) => {
        this.grid2 = event.cmp;
    }
    gridReady3 = (event) => {
        this.grid3 = event.cmp;
    }

    onFormReady = function (event) {
      this.form = event.cmp;
    }

    saveForm = (evnt) => {
      let model: VoucherHeader;
      if (!this.form.validate()) return;

      model = this.form.getValues();

      this.store.dispatch(new AdjustTransaction(model))
        .subscribe(() => {
          this.store.dispatch(new listFinancialTransaction());
        });
    }

    fetchPrevious = (evnt) => {

    }

    addNew = (evnt) => {

    }

    delete = (evnt) => {

    }

    cancelForm = (evnt) => {
      this.form.reset(true);

      this.isDialogShowing = false;
      this.cd.detectChanges();
    }

    onChilddoubletap = ({ sender, location  }) => {
       const record = location.record;
       const {id , ...selectedRecord} = record.data;

        this.store.dispatch(new GetTransactionDetail(selectedRecord))
          .subscribe((result) => {
            this.loadForm(result);
        });
    }

    loadForm(result: any){
        this.getTransactionDetail$.subscribe((data) => {
          // console.log(data);
          this.financial_store.setData(data);
        });

    }



    onSelect = ({ sender, selected }) => {
        selected.forEach(element => {
          const  {id, ... selectedData} = element.data;
          this.selectedTransaction.push(selectedData);
        });

        if(this.selectedTransaction.length >= 1){
            this.store.dispatch(new GetTransactionDetail(this.selectedTransaction))
              .subscribe((result) => {
                this.loadForm(result);
            });
        }
      };

    onDeselect = ({ sender, records  }) => {
        records.forEach(selectedRecord => {
          const  {id, ... selectedData} = selectedRecord.data;
          this.selectedTransaction.splice(selectedData.Id, 1);
        });
    };

    onReady = (event) => {
      this.formRef = event.cmp;

    }

    onPost = function() {
      if(this.selectedTransaction.length >= 1){
        this.store.dispatch(new PostTransaction(this.selectedTransaction)).subscribe((result) => {
            this.store.dispatch(new listFinancialTransaction());
        });
      }
      this.selectedTransaction = [];
    };

     onUnpost = function() {
     if(this.selectedTransaction.length >= 1){
        this.store.dispatch(new UnPostTransaction(this.selectedTransaction)).subscribe((result) => {
            this.store.dispatch(new listFinancialTransaction());
        });
      }
      this.selectedTransaction = [];
    };

     onVoid = function() {
      if(this.selectedTransaction.length >= 1){
        this.store.dispatch(new VoidTransaction(this.selectedTransaction)).subscribe((result) => {
            this.store.dispatch(new listFinancialTransaction());
        });
      }
      this.selectedTransaction = [];
    };

     onAdjust = function () {
       if(this.selectedTransaction.length >= 1){
         debugger
        this.store.dispatch(new GetJVNumber(this.selectedTransaction[0].Id)).subscribe((result) => {
            this.store.dispatch(new listFinancialTransaction());
        });
           this.isDialogShowing = true;
          this.cd.detectChanges();

          this.form.setTitle('Adjust Financial Transaction')
          //this.form.setValues(record.data);
      }

    };

     onDelete = function() {
      if(this.selectedTransaction.length >= 1){
        this.store.dispatch(new DeleteTransaction(this.selectedTransaction)).subscribe((result) => {
            this.store.dispatch(new listFinancialTransaction());
        });
      }
    };

    salarySummaryRenderer = (value) => {

      if(value != undefined){
          return Ext.util.Format.currencySign(value, "ETB", 2, false, true);
      }
    }


    renderBoolean = (value) => {

      if (value) {
        return "<p class='x-fa fa-check' style='color:green;text-align:center;font-size: 18px;'></p> ";
      }
      else {
        return "<p class='x-fa fa-times' style='color:#f44336;text-align:center;font-size: 18px;'></p> ";
      }
    }





}
