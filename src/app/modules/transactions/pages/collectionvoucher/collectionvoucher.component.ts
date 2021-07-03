declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreateCollectionVoucher,
  listCollectionVoucher,
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
  stored: any;
  ngOnInit() {
    this.store.dispatch(new listCollectionVoucher());
    this.listCollectionVoucher$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        fields: ['Name', 'Code'],
        data: stateValue,
      });
    });
  }
}
