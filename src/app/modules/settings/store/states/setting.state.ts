import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  FixedAssetSettings,
  GeneralSettings,
  voucherType,
} from '../../../../models/defaultSettings';
import { SettingsApiService } from '../../apis/settings.api.service';
import {
  CreateFixedAssetsSettings,
  CreateGeneralSettings,
  ListVoucherTypes,
} from './../action/setting.action';

export interface SettingStateModel {
  voucherType: voucherType;
  createGeneralSettings: GeneralSettings;
  createFixedAssetSettings: FixedAssetSettings;
  loading: boolean;
}

@State<SettingStateModel>({
  name: 'SettingState',
  defaults: {
    voucherType: undefined,
    loading: undefined,
    createGeneralSettings: undefined,
    createFixedAssetSettings: undefined,
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

  @Action(CreateGeneralSettings) createGeneralSettings(
    { patchState }: StateContext<SettingStateModel>,
    payload: GeneralSettings
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createGeneralSettings(payload).pipe(
      tap((result: GeneralSettings) => {
        patchState({ createGeneralSettings: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(CreateFixedAssetsSettings) createFixedAssetSettings(
    { patchState }: StateContext<SettingStateModel>,
    payload: FixedAssetSettings
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createFixedAssetSettings(payload).pipe(
      tap((result: FixedAssetSettings) => {
        patchState({ createFixedAssetSettings: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }
}
