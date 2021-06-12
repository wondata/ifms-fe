declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherData';
@Component({
  selector: 'app-financialtransaction',
  templateUrl: './financialtransactions.component.html',
  styleUrls: ['./financialtransactions.component.scss'],
})
export class FinancialTransactionComponent implements OnInit {
  constructor(private readonly store: Store) {}
  stored = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {}
}
