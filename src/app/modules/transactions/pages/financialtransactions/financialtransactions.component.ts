declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherData';
import { ListVoucher } from '../../store/action/transactions.action';
@Component({
  selector: 'app-financialtransaction',
  templateUrl: './financialtransaction.component.html',
  styleUrls: ['./financialtransaction.component.scss'],
})
export class FinancialTransactionComponent implements OnInit {
  constructor(private readonly store: Store) {}
  stored = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {}
}
