import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { voucherType } from '../../../../models/defaultSettings';
import { SettingsApiService } from '../../apis/settings.api.service';
import { ListVoucherTypes } from './../action/setting.action';

export interface SettingStateModel {
  voucherType: voucherType;
}

@State<SettingStateModel>({
  name: 'SettingState',
  defaults: {
    voucherType: undefined,
  },
})
@Injectable()
export class SettingState {
  constructor(private readonly settingApiService: SettingsApiService) {}

  @Selector() public static voucherType(state: SettingStateModel): voucherType {
    return state.voucherType;
  }

  @Action(ListVoucherTypes) getVoucherType({
    patchState,
  }: StateContext<SettingStateModel>): any {
    return this.settingApiService.voucherType().pipe(
      tap((type: voucherType) => {
        patchState({ voucherType: type });
      })
    );
  }
}
