import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  Cashier, CostCode, FixedAssetSettings,
  GeneralSettings,
  LookupModel, VoucherType,
  VoucherTypeSetting
} from '../../../../models/defaultSettings';
import { SettingsApiService } from '../../apis/settings.api.service';
import {
  CreateCashier, CreateCostCode, CreateFixedAssetsSettings, CreateGeneralSettings, CreateVoucherType, DataVoucherType, DeleteCashier, DeleteCostCode, GetAccounts, GetLookups, ListAccounts,
  ListCashier, ListControlAccounts, ListCostCenter, DeleteVoucherType,
  ListCostCode, ListUsers, ListVoucherType, ListVoucherTypeSetting
} from './../action/setting.action';


export interface SettingStateModel {
  voucherType: VoucherType;
  createGeneralSettings: GeneralSettings;
  createFixedAssetSettings: FixedAssetSettings;
  createVoucherType: VoucherTypeSetting;
  createCostCode: CostCode;
  deleteCostCode: CostCode;
  createCashier: Cashier;
  deleteCashier: Cashier;
  listCostCode: any;
  listCostCenter : any;
  listAccounts: any;
  listUsers : any;
  getAccounts: any;
  getLookups: any;
  listControlAccounts: any;
  listCashier: any;
  listVoucherType: any;
  dataVoucherType: any;
  listVoucherTypeSetting : any;
  loading: boolean;
  deleteVoucherType: VoucherType;
}

@State<SettingStateModel>({
  name: 'SettingState',
  defaults: {
    voucherType: undefined,
    loading: undefined,
    createGeneralSettings: undefined,
    createVoucherType: undefined,
    createFixedAssetSettings: undefined,
    createCostCode: undefined,
    deleteCostCode: undefined,
    createCashier: undefined,
    deleteCashier: undefined,
    listCostCode: undefined,
    listCostCenter: undefined,
    listAccounts: undefined,
    listControlAccounts: undefined,
    listUsers: undefined,
    getAccounts: undefined,
    getLookups: undefined,
    listCashier: undefined,
    listVoucherType: undefined,
    dataVoucherType : undefined,
    listVoucherTypeSetting : undefined,
    deleteVoucherType: undefined,
  },
})
@Injectable()
export class SettingState {
  constructor(private readonly settingApiService: SettingsApiService) {}

  @Selector()
  public static voucherType(state: SettingStateModel): VoucherType {
    return state.voucherType;
  }

  @Selector()
  public static voucherTypeSetting(state: SettingStateModel): VoucherTypeSetting {
    return state.listVoucherTypeSetting;
  }

  @Selector()
  public static listCashier(state: SettingStateModel): Cashier {
    return state.listCashier;
  }
  @Selector()
  public static listCostCode(state: SettingStateModel): any {
    return state.listCostCode;
  }
  @Selector()
  public static listCostCenter(state: SettingStateModel): any {
    return state.listCostCenter;
  }
  @Selector()
  public static getAccounts(state: SettingStateModel): any {
    return state.getAccounts;
  }
  @Selector()
  public static listVoucherType(state: SettingStateModel): any {
    return state.listVoucherType;
  }

  @Selector()
  public static dataVoucherType(state: SettingStateModel): any {
    return state.dataVoucherType;
  }
  @Selector()
  public static listAccounts(state: SettingStateModel): any {
    return state.listAccounts;
  }

  @Selector()
  public static listControlAccounts(state: SettingStateModel): any {
    return state.listControlAccounts;
  }

  @Selector()
  public static listUsers(state: SettingStateModel): any {
    return state.listUsers;
  }

  @Selector()
  public static deleteVoucherType(state: SettingStateModel): any {
    return state.deleteVoucherType;
  }

  @Selector()
  public static getLookups(state: SettingStateModel): any {
    return state.getLookups;
  }


  @Action(ListCostCode) listCostCode(
    { patchState }: StateContext<SettingStateModel>,
      payload: any
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

  @Action(ListCostCenter) listCostCenter(
    { patchState }: StateContext<SettingStateModel>,
    payload: any
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.getCostCenter().pipe(
      tap((item: any) => {
        patchState({ listCostCenter: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

   @Action(ListControlAccounts) listControlAccounts(
    { patchState }: StateContext<SettingStateModel>,
      payload: any
      ): any {
        patchState({
          loading: true,
        });

    return this.settingApiService.listControlAccounts().pipe(
      tap((item: any) => {
        patchState({ listControlAccounts: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListAccounts) listAccounts(
    { patchState }: StateContext<SettingStateModel>,
      payload: any
      ): any {
        patchState({
          loading: true,
        });

    return this.settingApiService.listAccounts().pipe(
      tap((item: any) => {
        patchState({ listAccounts: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetAccounts) getAccounts(
    { patchState }: StateContext<SettingStateModel>,
      payload: GetAccounts
      ): any {
        patchState({
          loading: true,
        });

    return this.settingApiService.getAccounts(payload.payload).pipe(
      tap((item: CostCode) => {
        patchState({ getAccounts: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

   @Action(GetLookups) getLookups(
    { patchState }: StateContext<SettingStateModel>,
      payload: GetLookups
      ): any {
        patchState({
          loading: true,
        });

    return this.settingApiService.getLookups(payload.payload).pipe(
      tap((item: LookupModel[]) => {
        patchState({ getLookups: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListVoucherType) listVoucherTypes(
    { patchState }: StateContext<SettingStateModel>,
    payload: ListVoucherType
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.listVoucherType().pipe(
      tap((item: LookupModel[]) => {
        patchState({ listVoucherType: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(DataVoucherType) dataVoucherTypes(
    { patchState }: StateContext<SettingStateModel>,
    payload: DataVoucherType
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.getVoucherType().pipe(
      tap((item: any) => {
        patchState({ dataVoucherType: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

   @Action(ListVoucherTypeSetting) getVoucherTypeSetting({
    patchState,
  }: StateContext<SettingStateModel>): any {
    return this.settingApiService.getVoucherTypeSetting().pipe(
      tap((item: any) => {
        patchState({ listVoucherTypeSetting: item.Data, loading: false });
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

  @Action(ListUsers) listUsers(
    { patchState }: StateContext<SettingStateModel>,
    payload: ListUsers
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.listUsers().pipe(
      tap((item: any) => {
        patchState({ listUsers: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

    @Action(CreateGeneralSettings) createGeneralSettings(
    { patchState }: StateContext<SettingStateModel>,
    payload: CreateGeneralSettings
    ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createGeneralSettings(payload.payload).pipe(
      tap((result: GeneralSettings) => {
        patchState({ createGeneralSettings: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(CreateFixedAssetsSettings) createFixedAssetSettings(
    { patchState }: StateContext<SettingStateModel>,
    payload: CreateFixedAssetsSettings
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createFixedAssetSettings(payload.payload).pipe(
      tap((result: FixedAssetSettings) => {
        patchState({ createFixedAssetSettings: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }


  @Action(CreateVoucherType) createVoucherType(
    { patchState }: StateContext<SettingStateModel>,
    payload: CreateVoucherType
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createVoucherType(payload.payload).pipe(
      tap((result: VoucherTypeSetting) => {
        patchState({ createVoucherType: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(CreateCostCode) createCostCode(
    { patchState }: StateContext<SettingStateModel>,
    payload: CreateCostCode
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createCostCode(payload.payload).pipe(
      tap((result: CostCode) => {
        patchState({ createCostCode: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

   @Action(DeleteCostCode) deleteCostCode(
    { patchState }: StateContext<SettingStateModel>,
    payload: CreateCostCode
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.deleteCostCode(payload.payload).pipe(
      tap((result: CostCode) => {
        patchState({ createCostCode: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(DeleteVoucherType) deleteVoucherType(
    { patchState }: StateContext<SettingStateModel>,
    payload: DeleteVoucherType
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.deleteVoucherType(payload.payload).pipe(
      tap((result: VoucherType) => {
        patchState({ deleteVoucherType: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }


   @Action(CreateCashier) createCashier(
    { patchState }: StateContext<SettingStateModel>,
    payload: CreateCashier
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.createCashier(payload.payload).pipe(
      tap((result: Cashier) => {
        patchState({ createCashier: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

   @Action(DeleteCashier) deleteCashier(
    { patchState }: StateContext<SettingStateModel>,
    payload: DeleteCashier
  ): any {
    patchState({
      loading: true,
    });

    return this.settingApiService.deleteCashier(payload.payload).pipe(
      tap((result: Cashier) => {
        patchState({ deleteCashier: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

}
