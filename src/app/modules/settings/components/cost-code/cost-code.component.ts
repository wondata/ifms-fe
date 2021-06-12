declare var Ext: any;

import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListCostCode } from '../../store/action/setting.action';
import { SettingState } from '../../store/states/setting.state';
import { CostCode } from './../../../../models/defaultSettings';

@Component({
  selector: 'app-costcode',
  templateUrl: './cost-code.component.html',
  styleUrls: ['./cost-code.component.scss'],
})
export class CostCodeComponent implements OnInit {
  @Select(SettingState.listCostCode) listCostCode$: Observable<CostCode>;
  constructor(private readonly stored: Store) {}
  // store: any;
  input: any;
  ngOnInit() {
    this.stored.dispatch(new ListCostCode()).subscribe((stateValue: any) => {
      const costCodeList = stateValue.SettingState.listCostCode;
    });
  }
}
