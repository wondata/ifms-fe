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
  ListCostCode,
  ListVoucherTypes,
} from './../action/setting.action';

export interface SettingStateModel {
  voucherType: voucherType;
  createGeneralSettings: GeneralSettings;
  createFixedAssetSettings: FixedAssetSettings;
  listCostCode: any;
  listVoucherType: any;
  loading: boolean;
}

@State<SettingStateModel>({
  name: 'SettingState',
  defaults: {
    voucherType: undefined,
    loading: undefined,
    createGeneralSettings: undefined,
    createFixedAssetSettings: undefined,
    listCostCode: undefined,
    listVoucherType: undefined,
  },
})
@Injectable()
export class SettingState {
  constructor(private readonly settingApiService: SettingsApiService) {}

  @Selector() public static voucherType(state: SettingStateModel): voucherType {
    return state.voucherType;
  }
  @Selector()
  static listCostCode(state: SettingStateModel): any {
    return state.listCostCode;
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

  @Action(ListCostCode) listCostCode(
    { patchState }: StateContext<SettingStateModel>,
    payload: ListCostCode
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.getCostCodes().pipe(
      tap((item: any) => {
        const list = item.Data.map((i) => {
          return {
            Code: i.Code,
            Name: i.Name,
          };
        });
        patchState({ listCostCode: list, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListVoucherTypes) listVoucherTypes(
    { patchState }: StateContext<SettingStateModel>,
    payload: ListVoucherTypes
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.getVoucherType().pipe(
      tap((item: any) => {
        patchState({ listVoucherType: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }
}
