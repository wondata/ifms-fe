declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/voucherData';
@Component({
  selector: 'app-chartofaccount',
  templateUrl: './chartofaccount.component.html',
  styleUrls: ['./chartofaccount.component.scss'],
})
export class ChartOfAccountComponent implements OnInit {
  constructor(private readonly store: Store) {}
  stored = Ext.create('Ext.data.Store', {
    data: gridData,
  });

  ngOnInit() {}
}
