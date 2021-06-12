declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { listCollectionVoucher } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';
@Component({
  selector: 'app-collectionvoucher',
  templateUrl: './collectionvoucher.component.html',
  styleUrls: ['./collectionvoucher.component.scss'],
})
export class CollectionVoucherComponent implements OnInit {
  @Select(TransactionsState.listCollectionVoucher)
  listCollectionVoucher$: Observable<any>;
  constructor(private readonly store: Store) {}
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
