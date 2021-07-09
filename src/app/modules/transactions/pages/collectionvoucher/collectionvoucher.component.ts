declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreateCollectionVoucher,
  listCollectionVoucher
} from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-collectionvoucher',
  templateUrl: './collectionvoucher.component.html',
  styleUrls: ['./collectionvoucher.component.scss'],
})
export class CollectionVoucherComponent implements OnInit {
    @Select(TransactionsState.listCollectionVoucher)
    listCollectionVoucher$: Observable<any>;
    collectionVoucherForm: FormGroup;
    formRef:any;
    grid:any;

    stored = Ext.create('Ext.data.Store', {

    });

    disabled:boolean = false;


  constructor(private readonly fb: FormBuilder, private readonly store: Store) {
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
      this.listCollectionVoucher$.subscribe((stateValue) => {
        this.stored.setData(stateValue);
      });
    }

    onSubmitCollectionVoucherForm(): void {
      if (this.collectionVoucherForm.valid) {
        this.collectionVoucherForm.markAsPristine();
        this.store
          .dispatch(new CreateCollectionVoucher(this.collectionVoucherForm.value))
          .subscribe(() => {
            this.store.dispatch(new listCollectionVoucher());
          });
      } else {
        Ext.toast('All required fields should be filled!');
      }
    }

  onReady = (event) => {
        this.formRef = event.cmp;

      }
    gridReady = (event) => {
        this.grid = event.cmp;
      }

  onChilddoubletap = ({  sender, location }) => {
    const record = location.record;
    const {id , ...selectedRecord} = record.data;

      // this.store.dispatch(new GetVoucherHeaderDetail(selectedRecord))
      // .subscribe((result) => {
      //   this.loadForm(result);
      // });

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
