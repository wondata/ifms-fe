declare var Ext: any;

import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CostCode } from 'src/app/models/defaultSettings';
import { ListCashier } from '../../store/action/setting.action';
import { SettingState } from '../../store/states/setting.state';
@Component({
  selector: 'app-cashierPage',
  templateUrl: './cashier-page.component.html',
  styleUrls: ['./cashier-page.component.scss'],
})
export class CashierPageComponent implements OnInit {
  @Select(SettingState.listCashier) listCashier$: Observable<CostCode>;
  constructor(private readonly store: Store) {}
  ngOnInit() {
    this.store.dispatch(new ListCashier());
  }
}
