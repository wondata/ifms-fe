declare var Ext: any;

import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CostCode } from 'src/app/models/defaultSettings';
import { ListCostCode } from '../../store/action/setting.action';
import { SettingState } from '../../store/states/setting.state';
@Component({
  selector: 'app-cost-code',
  templateUrl: './cost-code.component.html',
  styleUrls: ['./cost-code.component.scss'],
})
export class CostCodePageComponent implements OnInit {
  @Select(SettingState.listCostCode) listCostCode$: Observable<CostCode>;
  constructor(private readonly store: Store) {}
  stored: any;
  ngOnInit() {
    this.store.dispatch(new ListCostCode());
    this.listCostCode$.subscribe((stateValue: any) => {
      this.stored = Ext.create('Ext.data.Store', {
        fields: ['Name', 'Code'],
        data: stateValue,
      });
    });
  }
}
