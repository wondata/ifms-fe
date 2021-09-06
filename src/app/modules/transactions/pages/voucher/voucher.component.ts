declare var Ext: any;

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CostCode, SubsidiaryAccount, VoucherDetail, VoucherHeaderPost } from 'src/app/models/defaultSettings';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import {
  DeleteVoucherDetail, GetDefaultAccount, GetVoucherDetail, GetVoucherHeaderDetail, GetVoucherNumber,
  ListAccounts, ListCostCenter, ListModePayment, ListPurposeTemplates,
  ListVoucher, ListVoucherType, SaveVoucher
} from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
      rightResizable = {split: true,  edges: 'west'};
      isPhone = Ext.os.is.Phone;
      top = !this.isPhone ? '10' : null;
      left = !this.isPhone ? '10' : null;
      width = !this.isPhone ? '400' : null;
      height = !this.isPhone ? '600' : null;

      voucherForm: FormGroup;
      isDialogShowing:boolean = false;

      data_voucher = Ext.create('Ext.data.Store', {
        });
      data_costCenter = Ext.create('Ext.data.Store', {
        });
      data_account = Ext.create('Ext.data.Store', {
        });
      data_purpose = Ext.create('Ext.data.Store', {
        });
      data_modePayment = Ext.create('Ext.data.Store', {
        });
      stored = Ext.create('Ext.data.Store', {
        });
      voucherDetail = Ext.create('Ext.data.Store', {
        });

      disabled:boolean = false;
      formRef:any;
      formRef2:any;
      selRef:any;
      grid:any;
      grid2:any;
      date:String = new Date().toString();

      costCenterOptions : any;
      accountOptions: any;
      accountData: SubsidiaryAccount[];
      paymentData : CostCode[];
      voucherData : CostCode[];
      voucherDetailData : VoucherDetail[];

      selectedVoucherDetail : null;

      @Select(TransactionsState.listVoucher) listVoucher$: Observable<any>;
      @Select(TransactionsState.listAccounts) listAccounts$: Observable<any>;
      @Select(TransactionsState.listCostCenter) listCostCenter$: Observable<any>;
      @Select(TransactionsState.getVoucherHeader) getVoucherHeader$: Observable<any>;
      @Select(TransactionsState.getVoucherDetail) getVoucherDetail$: Observable<any>;
      @Select(TransactionsState.listVoucherType) listVoucherType$: Observable<any>;
      @Select(TransactionsState.listModePayment) listModePayment$: Observable<any>;
      @Select(TransactionsState.listPurposeTemplates) listPurposeTemplates$: Observable<any>;
      @Select(TransactionsState.getVoucherNumber) getVoucherNumber$: Observable<any>;
      @Select(TransactionsState.getDefaultAccount) getDefaultAccount$: Observable<any>;

      @Select(TransactionsState.saveVoucher) saveVoucher$: Observable<any>;
      @Select(TransactionsState.deleteVoucherDetail) deleteVoucherDetail$: Observable<any>;


     constructor(private readonly store: Store, private readonly fb: FormBuilder,
      private cd: ChangeDetectorRef,
      private snackService: SnackbarService,) {
      this.voucherForm = this.fb.group({
        CostCenterId: ['', Validators.required],
        VoucherTypeId: [''],
        Date: [''],
        ReferenceNo: [''],
        DocumentNo: [''],
        Amount: [''],
        ModeOfPaymentId: [''],
        ProjectId : [''],
        ChequeNo: [''],
        PostedDate : [''],
        PayedToReceivedFrom: [''],
        Purpose :[''],
        Description : [''],
        AuthorizedDate : [''],
        SettlementDate : [''],
        GuaranteeAdvance : [''],
        BankName : [''],
        BankBranch : [''],
        GuaranteeStartDate : [''],
        GuaranteeEndDate : [''],
        GuaranteeStatus : [''],
        DebitAmount : [''],
        CreditAmount : [''],
        txtBalance : ['']

      });
     }


    ngOnInit() {
      this.store.dispatch(new ListVoucher());
      this.store.dispatch(new ListVoucherType());
      this.store.dispatch(new ListModePayment());
      this.store.dispatch(new ListPurposeTemplates());
      this.store.dispatch(new ListAccounts());
      this.store.dispatch(new ListCostCenter());

      this.listVoucher$.subscribe((data) => {
        this.stored.setData(data);
      });
      this.listVoucherType$.subscribe((data) => {
        this.voucherData = data;
        this.data_voucher.setData(data);
      });

      this.listModePayment$.subscribe((data) => {
        this.paymentData = data;
        this.data_modePayment.setData(data);
      });

      this.listPurposeTemplates$.subscribe((data) => {
        this.data_purpose.setData(data);
      });

      this.listAccounts$.subscribe((data) => {
         this.accountOptions = data;
         this.accountData = data;
        this.data_account.setData(data);
      });

      this.listCostCenter$.subscribe((data) => {
        this.costCenterOptions = data;
        this.data_costCenter.setData(data);
      });

    }


    gridReady = (event) => {
        this.grid = event.cmp;
      }

    gridReady2 = (event) => {
        this.grid2 = event.cmp;
      }

    onReady = (event) => {
        this.formRef = event.cmp;

      }
    onReady2 = (event) => {
        this.formRef2 = event.cmp;
      }

    onChilddoubletap = ({  sender, location }) => {
        const record = location.record;
        const {id , ...selectedRecord} = record.data;

         this.store.dispatch(new GetVoucherDetail (selectedRecord));
         this.store.dispatch(new GetVoucherHeaderDetail(selectedRecord))
           .subscribe((result) => {
              this.loadForm(result);
          });

      }

    loadForm(result: any){
      var cmp = this;

      this.voucherForm.patchValue({
          txtBalance : 0,
          DebitAmount : 0,
          CreditAmount : 0
        });

      this.formRef.reset(true);
      this.reset(true);

      this.getVoucherHeader$.subscribe((data) => {
            this.formRef.setValues(data[0]);
        });

      this.getVoucherDetail$.subscribe((data) => {
          // console.log(data);
          this.voucherDetail.setData(data);
          this.voucherDetailData = data;
          this.formRef.setValues(data);

          if(data !== undefined){
            var total_debit = 0;
            var total_credit = 0;
            var total_balance = 0;

            data.forEach(element => {
             total_debit  += element['DebitAmount'];
             total_credit += element['CreditAmount'];
             total_balance = total_credit - total_debit;

             this.voucherForm.patchValue({
                txtBalance : total_balance,
              });

              this.formRef.setValues({txtBalance : total_balance})
            });
          }
          if(data !== undefined){
             cmp.checkBalance(data, 'DebitAmount');
             cmp.checkBalance(data, 'CreditAmount');
          }
        });

      }


    onCheckGuarantee = ({ sender }) => {

        this.formRef.nameRefs.BankName.setHidden(false);
        this.formRef.nameRefs.BankBranch.setHidden(false);
        this.formRef.nameRefs.GuaranteeStartDate.setHidden(false);
        this.formRef.nameRefs.GuaranteeEndDate.setHidden(false);
        this.formRef.nameRefs.GuaranteeStatus.setHidden(false);

      };

    onUncheckGuarantee = ({ sender }) => {

        this.formRef.nameRefs.BankName.setHidden(true);
        this.formRef.nameRefs.BankBranch.setHidden(true);
        this.formRef.nameRefs.GuaranteeStartDate.setHidden(true);
        this.formRef.nameRefs.GuaranteeEndDate.setHidden(true);
        this.formRef.nameRefs.GuaranteeStatus.setHidden(true);

      };

    onChangeMOP = ({ sender, newValue, oldValue }) => {
      var payment_name = '';
      this.paymentData.filter(x => x.Id == newValue ).forEach(x => {
            payment_name = x.Name;
      });
          if(payment_name !== null || payment_name !== undefined){
            if(payment_name !== 'Cash'){
             this.formRef.nameRefs.ChequeNo.setHidden(false);
             this.formRef.nameRefs.PostedDate.setHidden(false);
            }else{
             this.formRef.nameRefs.ChequeNo.setHidden(true);
             this.formRef.nameRefs.PostedDate.setHidden(true);
            }
          }
    };

    onChangeVoucherType = ({ sender, newValue, oldValue }) => {
      var voucher_name = '';

      if(this.formRef.nameRefs.CostCenterId._value == null || this.formRef.nameRefs.CostCenterId._value == '' ) {
        this.formRef.nameRefs.VoucherTypeId.reset ();
         this.snackService.open('Cost Center Should be Selected!', '200', "error");
      }else{
         this.store.dispatch(new GetVoucherNumber (this.formRef.nameRefs.CostCenterId._value, newValue));
           this.getVoucherHeader$.subscribe((data) => {
             if(data != null){
                this.formRef.setValues({ReferenceNo : data[0].ReferenceNo});
                this.formRef.setValues({DocumentNo : data[0].ReferenceNo});
             }

            });
           this.voucherData.filter(x => x.Id == newValue ).forEach(x => {
            voucher_name = x.Name;
          });
          if(voucher_name !== ''){
            switch(voucher_name){
                case 'CSI':
                case 'CrSV':
                case 'CRV':
                    this.formRef.nameRefs.PayedToReceivedFrom.setHidden(false);
                    this.formRef.nameRefs.PayedToReceivedFrom.setLabel('Received From: ');
                    this.formRef.nameRefs.Amount.setHidden(false);
                    this.formRef.nameRefs.ModeOfPaymentId.setHidden(false);
                    this.formRef.nameRefs.ModeOfPaymentId.setLabel('Mode of Collection: ');
                    this.formRef.nameRefs.TaxId.setHidden(false);
                    this.formRef.nameRefs.PostedDate.setHidden(true);
                    break;
                case 'CPV':
                case 'PCPV':
                case 'BPV':
                    this.formRef.nameRefs.PayedToReceivedFrom.setHidden(false);
                    this.formRef.nameRefs.PayedToReceivedFrom.setLabel('Paid To: ');
                    this.formRef.nameRefs.Amount.setHidden(false);
                    this.formRef.nameRefs.ModeOfPaymentId.setHidden(false);
                    this.formRef.nameRefs.ModeOfPaymentId.setLabel('Mode of Payment: ');
                    this.formRef.nameRefs.TaxId.setHidden(false);
                    this.formRef.nameRefs.PostedDate.setHidden(false);
                    break;
                case 'BDV': //Bank Deposit Voucher
                    this.formRef.nameRefs.Amount.setHidden(false);
                    this.formRef.nameRefs.ModeOfPaymentId.reset();
                    this.formRef.nameRefs.ModeOfPaymentId.setHidden(true);
                    this.formRef.nameRefs.ModeOfPaymentId.setLabel('Mode of Payment: ');
                    this.formRef.nameRefs.ChequeNo.setHidden(true);
                    this.formRef.nameRefs.PayedToReceivedFrom.setHidden(false);
                    this.formRef.nameRefs.PayedToReceivedFrom.setLabel('Deposited By: ');
                    this.formRef.nameRefs.PostedDate.setHidden(true);
                    break;
                case 'JV':
                case 'JV For Adjustment':
                case 'JV For Fixed Asset':
                case 'JV For Insurance':
                case 'JV For Inventory Adjustment':
                case 'JV for Payroll Expense Recognition':
                case 'Purchase Journal':
                case 'JV For Transport':
                case 'JV For Rent':
                    this.formRef.nameRefs.Amount.setHidden(true);
                    this.formRef.nameRefs.ModeOfPaymentId.setHidden(true);
                    this.formRef.nameRefs.ChequeNo.setHidden(true);
                    this.formRef.nameRefs.PayedToReceivedFrom.setHidden(true);
                    this.formRef.nameRefs.TaxId.setHidden(true);
                    this.formRef.nameRefs.PostedDate.setHidden(true);
                    break;
                default:
                    break;
            }

            if(voucher_name == 'CRV' || voucher_name == 'CPV' || voucher_name == 'PCPV'){
                this.store.dispatch(new GetDefaultAccount (newValue));
                this.getDefaultAccount$.subscribe((data) => {
                  this.voucherDetail.setData(data);
                  this.voucherDetail.insert(1, data);
                });
            }
          }
      }
    };

    OnSelChange = (event) => {
        this.selRef = event.cmp;
      }

    onPreview = (event) => {

    }

    onAddRow = (event) => {

      this.voucherDetail.insert(1, 0);
      this.voucherDetail.add({});

      this.checkBalance(this.voucherDetail, 'DebitAmount');
      this.checkBalance(this.voucherDetail, 'CreditAmount');
    }

    onTaxCalculation = (event) => {

      this.voucherDetail.insert(1, 0);
      this.voucherDetail.add({});
    }

    onLoadAccount = (event) => {

      this.voucherDetail.insert(1, 0);
      this.voucherDetail.add({});
    }

    onNew = (event) => {

      this.formRef.reset();
      this.voucherDetail.setData({});
      this.formRef.nameRefs.PayedToReceivedFrom.setHidden(false);
      this.formRef.nameRefs.ModeOfPaymentId.setHidden(true);
      this.formRef.nameRefs.PostedDate.setHidden(true);
    }


    onSave = (event) => {

       const formModel =  this.formRef.nameRefs;
        let voucherHeaderPost: VoucherHeaderPost;

        var storeData = this.voucherDetail.data;
        var detailData = storeData.items;

        var voucherDetails = [];

        if(this.voucherDetailData == null){
          this.snackService.open('Please, Fill all the Required Fields!', '200', "error");
          return;
        }
        detailData.forEach(element => {
            if(element.data['CostCenter']  != '' && element.data['CostCenterId'] != '' && element.data['ControlAccountId'] != '' && element.data['AccountId'] != '' && element.data['AccountCode'] != '' ){
              var DetailsVoucher = {
                Id : element.data['Id'],
                CostCenterId: element.data['CostCenterId'],
                ControlAccountId: element.data['ControlAccountId'],
                AccountId: element.data['AccountId'],
                DebitAmount: element.data['DebitAmount'],
                CreditAmount: element.data['CreditAmount'],
                ReferenceVoucherHeaderId: element.data['ReferenceVoucherHeaderId'],
                CaseNoId: element.data['CaseNoId'],
                CostCodeId: element.data['CostCodeId'],
                CustomerId: element.data['CustomerId'],
                SupplierId: element.data['SupplierId'],
                StaffId: element.data['StaffId'],
                ProjectTaskId: element.data['ProjectTaskId'],
                IsInterBranchTransactionCleared: element.data['IsInterBranchTransactionCleared'],
                IBTReferenceVoucherHeaderId: element.data['IBTReferenceVoucherHeaderId'],
                Remark: element.data['Remark']
              };
              voucherDetails.push(DetailsVoucher);
            }

        });


        if(voucherDetails.length == 0){
          this.snackService.open('Cost Center Should be Selected!', '200', "error");
          return;
        }

        voucherHeaderPost = {
          Id : formModel.Id._value,
          CostCenterId: formModel.CostCenterId._value,
          VoucherTypeId : formModel.VoucherTypeId._value,
          ReferenceNo : formModel.ReferenceNo._value,
          DocumentNo : formModel.DocumentNo._value,
          Date : formModel.Date._value,
          PeriodId : '',
          PayedToReceivedFrom : formModel.PayedToReceivedFrom._value,
          PurposeTemplateId : formModel.PurposeTemplateId._value,
          Description : formModel.Description._value,
          Amount : formModel.Amount._value,
          TaxId : formModel.TaxId._value,
          ModeOfPaymentId : formModel.ModeOfPaymentId._value,
          ChequeNo : formModel.ChequeNo._value,
          IsPosted : true,
          IsAdjustment : true,
          IsVoid : true,
          PostedFromOperation : '',
          AuthorizedDate : formModel.AuthorizedDate._value,
          VoucherDetails : voucherDetails,
        };
        //  voucherDetails.push(newModel);

        if(Number(this.formRef2.nameRefs.txtBalance._value) > 0){
          const dialogRef = Ext.Msg.confirm("Confirmation", "The transaction that you are going to save is unbalanced. Are you sure you want to proceed?",
               this.onConfirmResult.bind(this, voucherHeaderPost));
        }else{
          this.store.dispatch(new SaveVoucher( voucherHeaderPost));
          this.saveVoucher$.subscribe( (result) => {
            if (result.ResponseStatus === "Success") {
              this.snackService.open(result.Message, result.ResponseStatus, "success")
            } else {
              this.snackService.open(result.Message, result.ResponseStatus, "error");
            }
          });

        }
    }



    onConfirmResult(voucherHeaderPost, value, opt) {
      if(value === 'yes'){
          this.store.dispatch(new SaveVoucher(voucherHeaderPost));
          this.saveVoucher$.subscribe( (result) => {

            if (result.ResponseStatus === "Success") {
              this.snackService.open(result.Message, result.ResponseStatus, "success")
            } else {
              this.snackService.open(result.Message, result.ResponseStatus, "error");
            }
          });
      }
    }

    showDialog = () => {this.isDialogShowing = true;
      this.cd.detectChanges();
    }
    onOk = () => {this.isDialogShowing = false;
      this.cd.detectChanges();
    }
    onCancel = () => {this.isDialogShowing = false;
      this.cd.detectChanges();
    }
    onHide = () => {this.isDialogShowing = false;
      this.cd.detectChanges();
    }


    renderColumn = (value, record, dataIndex, cell, column) => {
      let selectedRecord;
      if (dataIndex === "CostCenterId") {
        selectedRecord = this.costCenterOptions?.find(i => i.value === value);
      }else if (dataIndex === "SubsidiaryAccountId") {
        selectedRecord = this.accountOptions?.find(i => i.value === value);
      }

      if (selectedRecord !== undefined) {
        return selectedRecord.text;
      }

      return value;
    }

    onSelectionChange = (grid, records, selecting, selection) => {
      let record = records[0].data;
      if(record.Id !== null){
        this.selectedVoucherDetail = record.Id;
        //  this.formRef2.nameRefs;

      }else{
        this.selectedVoucherDetail = null;
        // this.formRef2.nameRefs.deleteButton.setDisabled();
      }
    };

     onDelete = (event) => {
      // var record = this.voucherDetail.getData();
      this.selectedVoucherDetail;
      debugger
      if(this.selectedVoucherDetail !== null){
        this.store.dispatch(new DeleteVoucherDetail(this.selectedVoucherDetail));
        this.deleteVoucherDetail$.subscribe( (result) => {
            if (result.ResponseStatus === "Success") {
              this.snackService.open(result.Message, result.ResponseStatus, "success")
              this.grid2.refresh();
            } else {
              this.snackService.open(result.Message, result.ResponseStatus, "error");
            }
          });

      }else{
        this.snackService.open('Please, Select one from the Voucher Details!', '200', "error");
      }

    }

    onSpecialkey = ({ editor, field, event }) => {

      let key = event.getKey();
      let col = editor.$column._dataIndex;
      let account_name = "";
      let account_id = "";
      if(key === event.TAB){

        if(col === 'Remark'){
          // debugger
          this.onAddRow(event);
        }else if(col === 'SubsidiaryAccountId'){
          let SubId = field._value;
          this.accountData.filter(x => x.Id == SubId ).forEach(x => {
            account_name = x.Name;
            account_id = x.Id;
          });

          // editor.$activeRow.cells[4].setValue(account_id) ;
          editor.$activeRow.cells[4].setRawValue(account_name) ;
          // editor.$activeRow.cells[4].setValue(account_name) ;
          this.voucherDetail.setFields({'SubsidiaryAccount': account_name});
          // this.voucherDetail.setFields({'SubsidiaryAccountId': account_id});
          debugger



        }

      }else if ( key === event.ENTER){
        // Enter Key
        if(col === 'Remark'){
          this.onAddRow(event);
        }
      }
    };


    onEdit = ({ sender, location  }) => {
      debugger
      var account_name = '';
      var editor = location.record;
      var editor_data = editor.data;
      var index = location.column;
      var field = index._dataIndex;

      if(field == 'SubsidiaryAccountId'){

        var data = editor_data.SubsidiaryAccountId;

        if(data !== undefined){

          this.accountData.filter(x => x.Id == data ).forEach(x => {
            account_name = x.Name;
          });
          location.cell.row.cells[4].setRawValue(account_name);
          location.cell.row.cells[4].setRecord(account_name);

          location.child.cells[4].setRecord(account_name);
          location.child.cells[4].setRawValue(account_name);
          // location.child.cells[4].setColumn(account_name);
          this.voucherDetail.setFields({'SubsidiaryAccount': account_name});
          debugger

        }
      }else if (field == 'Remark'){
          this.grid2.onNavigate(sender.event);
      }

      this.checkBalance(this.voucherDetail, 'DebitAmount');
      this.checkBalance(this.voucherDetail, 'CreditAmount');




      debugger

    }

    onSubmitRow = ({ sender, location : string}) => {
      this.grid2.getRecordIndex();
      debugger

    }





    checkBalance ( store, field )  {

        let total = 0;
        let balance = 0;
        if(store !== undefined && store.length >= 1){
           store.forEach(element => {
            total = Number(total) + Number(element[field]);
          });
          // get Debit Amount
          let totalDebit = this.voucherForm.controls.DebitAmount.value;
          // get credit Amount
          let totalCredit = this.voucherForm.controls.CreditAmount.value;

          balance = Number(totalDebit >= totalCredit ? totalDebit - totalCredit : totalCredit - totalDebit);

          this.voucherForm.patchValue({
            txtBalance : Number(balance)
          });

          this.formRef2.setValues({txtBalance : Number(balance)})
        }

      }


    summarizeDebit = (grid, context) => {

      var count = context.records.length;
      var total_debit = 0 ;

      if(count !== undefined ){

        var datas = context.records;
          datas.forEach( element => {
          total_debit += Number(element.data['DebitAmount']);

        });
      }
      this.voucherForm.patchValue({
            DebitAmount :  Number(total_debit)
          });
      this.formRef2.setValues({DebitAmount :  Number(total_debit)});
      this.checkBalance(this.voucherDetailData, 'DebitAmount');

    };

    summarizeCredit = (grid, context) => {
       var count = context.records.length;
        var total_credit = 0;

        if(count !== undefined ){

          var datas = context.records;
          datas.forEach( element => {
            total_credit += Number(element.data['CreditAmount']);
          });
        }
          this.voucherForm.patchValue({
            CreditAmount :  Number(total_credit)
          });
        this.formRef2.setValues({CreditAmount :  Number(total_credit)})
        this.checkBalance(this.voucherDetailData, 'CreditAmount');

    };

    renderSign = (value) =>  {
        if (value) {
          return "<p class='x-fa fa-check' style='color:green;text-align:center;font-size: 18px;'></p> ";
        }
        else {
          return "<p class='x-fa fa-times' style='color:#f44336;text-align:center;font-size: 18px;'></p> ";
        }
    }

    toggleDisabled = (event) => {
        this.disabled = !this.disabled;
    }

    reset = (event) => this.formRef.reset();


}
