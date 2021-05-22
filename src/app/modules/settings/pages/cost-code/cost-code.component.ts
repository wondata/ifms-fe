declare var Ext: any;

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { gridData } from '../../components/costCodeData';
import { ListCostCode } from '../../store/action/setting.action';

@Component({
  selector: 'app-cost-code',
  templateUrl: './cost-code.component.html',
  styleUrls: ['./cost-code.component.scss'],
})
export class CostCodeComponent implements OnInit {
  constructor(private readonly stored: Store) {}
  store = Ext.create('Ext.data.Store', {
    fields: ['Id', 'Name', 'Code'],
    data: gridData,
  });

  ngOnInit() {
    this.stored.dispatch(new ListCostCode());
  }
}
