declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherData';
@Component({
  selector: 'app-bankreconciliation',
  templateUrl: './bankreconciliation.component.html',
  styleUrls: ['./bankreconciliation.component.scss'],
})
export class BankReconciliationComponent implements OnInit {
  constructor(private readonly store: Store) {}
  stored = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {}
}
