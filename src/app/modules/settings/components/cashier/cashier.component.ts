declare var Ext: any;

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CostCode } from '../../../../models/defaultSettings';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.compnent.html',
  styleUrls: ['./cashier.component.scss'],
})
export class CashierComponent implements OnInit {
  @Input() listCashier: CostCode;
  constructor(private readonly store: Store) {}
  stored: any;
  ngOnInit() {
    this.stored = Ext.create('Ext.data.Store', {
      fields: ['Name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
      data: this.listCashier,
    });
  }
}
