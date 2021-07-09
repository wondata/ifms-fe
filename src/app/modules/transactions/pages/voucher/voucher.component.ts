declare var Ext: any;

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateVoucher, GetVoucherDetail, GetVoucherHeaderDetail, ListVoucher } from '../../store/action/transactions.action';
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

    disabled:boolean = false;
    formRef:any;
    selRef:any;
    grid:any;
    grid2:any;

     @Select(TransactionsState.listVoucher) listVoucher$: Observable<any>;
     @Select(TransactionsState.getVoucherHeader) getVoucherHeader$: Observable<any>;
     @Select(TransactionsState.getVoucherDetail) getVoucherDetail$: Observable<any>;



     constructor(private readonly store: Store, private readonly fb: FormBuilder) {

     }

     stored = Ext.create('Ext.data.Store', {

      });

     voucherDetail = Ext.create('Ext.data.Store', {

      });


    ngOnInit() {
      this.store.dispatch(new ListVoucher());

      this.listVoucher$.subscribe((data) => {
        this.stored.setData(data);
        console.log(data);
      });


      this.voucherForm = this.fb.group({
        OwnerCostCenter: ['', Validators.required],
        VoucherType: [''],
        Date: [''],
        SequenceNo: [''],
        OtherRefNo: [''],
        Amount: [''],
        ModeOfPayment: [''],
        Project: [''],
      });

    }

    onSubmitVoucherForm(): void {
        if (this.voucherForm.valid) {
          this.voucherForm.markAsPristine();
          this.store
            .dispatch(new CreateVoucher(this.voucherForm.value))
            .subscribe(() => {
              Ext.toast('Successfully added VoucherForm');
            });
        } else {
          Ext.toast('All required fields should be filled!');
        }
      }

    renderSign = (value) =>  {
        var col = ''
        if(value == "True") {col = 'green'}
        else if(value == "False" ) {col = 'red'}
          return `<span style='color:${col}'>${value}</span>`
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
        this.formRef.reset(true);
        this.reset(true);
        this.getVoucherHeader$.subscribe((data) => {
           this.formRef.setValues(data[0]);
        });
        this.getVoucherDetail$.subscribe((data) => {
          this.voucherDetail.setData(data);
          console.log(data);
        });

      }


    OnSelChange = (event) => {
        this.selRef = event.cmp;
      }

    toggleDisabled = (event) => {
        this.disabled = !this.disabled;
      }

    reset = (event) => this.formRef.reset();

}
