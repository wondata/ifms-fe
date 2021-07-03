import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  Cashier,
  FixedAssetSettings,
  GeneralSettings,
  VoucherType,
} from '../../../../models/defaultSettings';
import { SettingsApiService } from '../../apis/settings.api.service';
import {
  CreateFixedAssetsSettings,
  CreateGeneralSettings,
  CreateVoucherType,
  ListCashier,
  ListCostCode,
  ListVoucherTypes,
} from './../action/setting.action';

export interface SettingStateModel {
  voucherType: VoucherType;
  createGeneralSettings: GeneralSettings;
  createFixedAssetSettings: FixedAssetSettings;
  createVoucherType: any;
  listCostCode: any;
  listCashier: any;
  listVoucherType: any;
  loading: boolean;
}

@State<SettingStateModel>({
  name: 'SettingState',
  defaults: {
    voucherType: undefined,
    loading: undefined,
    createGeneralSettings: undefined,
    createVoucherType: undefined,
    createFixedAssetSettings: undefined,
    listCostCode: undefined,
    listCashier: undefined,
    listVoucherType: undefined,
  },
})
@Injectable()
export class SettingState {
  constructor(private readonly settingApiService: SettingsApiService) {}

  @Selector() public static voucherType(state: SettingStateModel): VoucherType {
    return state.voucherType;
  }

  @Selector() public static listCashier(state: SettingStateModel): Cashier {
    return state.listCashier;
  }
  @Selector()
  static listCostCode(state: SettingStateModel): any {
    return state.listCostCode;
  }
  @Action(ListVoucherTypes) getVoucherType({
    patchState,
  }: StateContext<SettingStateModel>): any {
    return this.settingApiService.getVoucherType().pipe(
      tap((item: any) => {
        patchState({ listVoucherType: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
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
        patchState({ listCostCode: item.Data, loading: false });
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
        patchState({ listVoucherType: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }
  @Action(ListCashier) listCashier(
    { patchState }: StateContext<SettingStateModel>,
    payload: ListCashier
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.getCashier().pipe(
      tap((item: any) => {
        patchState({ listCashier: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(CreateVoucherType) createVoucherType(
    { patchState }: StateContext<SettingStateModel>,
    payload: any
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createVoucherType(payload).pipe(
      tap((result: any) => {
        patchState({ createVoucherType: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }
}
