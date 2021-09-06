import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cashier, CostCode, FixedAssetSettings, GeneralSettings, LookupModel, Users, VoucherType, voucherType, VoucherTypeSetting } from './../../../models/defaultSettings';
import { SettingsEndpoints } from './settings.endpoint';

@Injectable()
export class SettingsApiService {
  constructor(private readonly http: HttpClient) {}

  contentType = 'Content-Type';
  contentApplication = 'application/json';

  voucherType(): Observable<voucherType> {
    return this.http.get<voucherType>(SettingsEndpoints.voucherType).pipe(
      map((value: any) => {
        return value.reduce((a, x) => ({ ...a, [x.value]: x.name }), {});
      })
    );
  }


  getCostCodes(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getCostCodes, null);
  }
  getCostCenter(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getCostCenter, null);
  }

  listAccounts(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.listAccounts, null);
  }
  listControlAccounts(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.listControlAccounts, null);
  }

  getVoucherType(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getVoucherType, null);
  }

  getModePayment(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getModePayment, null);
  }

  getVoucherTypeSetting(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.listVoucherTypeSetting, null);
  }
  getCashier(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getCashier, null);
  }

  listVoucherType(): Observable<LookupModel[]> {
    return this.http.post<LookupModel[]>(SettingsEndpoints.listVoucherType, null)
    .pipe(
      map((data) => {
        return data;
      }),
    );
  }

  getLookups(lookupName: string): Observable<LookupModel[]> {
    return this.http.post<LookupModel[]>(SettingsEndpoints.getLookups, {"LookupName" :lookupName})
    .pipe(
      map((data) => {
        return data;
      }),
    );
  }

  getAccounts(costCode: CostCode): Observable<any> {
    return this.http.post<CostCode[]>(SettingsEndpoints.getAccounts, costCode)
    .pipe(
      map((data) => {
        return data;
      }),
    );
  }

  listUsers(): Observable<Users[]> {
    return this.http.post<Users[]>(SettingsEndpoints.listUsers, null)
    .pipe(
      map((data) => {
        return data;
      }),
    );
  }

   createGeneralSettings(
    generalSettings: GeneralSettings
  ): Observable<GeneralSettings> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<GeneralSettings>(
      SettingsEndpoints.createGeneralSettings,
      generalSettings,
      { headers }
    );
  }

  createFixedAssetSettings(
    fixedAssetSettings: FixedAssetSettings
     ): Observable<FixedAssetSettings> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<FixedAssetSettings>(
      SettingsEndpoints.createFixedAssetSettings,
      fixedAssetSettings,
      { headers }
    );
  }

    createVoucherType(
    voucherType: VoucherTypeSetting
     ): Observable<VoucherTypeSetting> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherTypeSetting>(
      SettingsEndpoints.createVoucherType,
      voucherType,
      { headers }
    );
  }

    createCostCode(
    costCode: CostCode
     ): Observable<CostCode> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<CostCode>(
      SettingsEndpoints.createCostCode,
      costCode,
      { headers }
    );
  }

  deleteCostCode(
    costCode: CostCode
     ): Observable<CostCode> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<CostCode>(
      SettingsEndpoints.deleteCostCode,
      costCode,
      { headers }
    );
  }

  deleteVoucherType(
    voucherType: VoucherType
     ): Observable<VoucherType> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherType>(
      SettingsEndpoints.deleteVoucherType,
      voucherType,
      { headers }
    );
  }

  createCashier(
    cashier: Cashier
     ): Observable<Cashier> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<Cashier>(
      SettingsEndpoints.createCashier,
      cashier,
      { headers }
    );
  }

  deleteCashier(
    cashier: Cashier
     ): Observable<Cashier> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<Cashier>(
      SettingsEndpoints.deleteCashier,
      cashier,
      { headers }
    );
  }




}
