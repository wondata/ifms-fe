declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherData';
import { ListVoucher } from '../../store/action/transactions.action';
@Component({
  selector: 'app-collectionvoucher',
  templateUrl: './collectionvoucher.component.html',
  styleUrls: ['./collectionvoucher.component.scss'],
})
export class CollectionVoucherComponent implements OnInit {
  constructor(private readonly store: Store) {}
  stored = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {}
}
