import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FixedAssetSettings,
  GeneralSettings,
  voucherType,
} from './../../../models/defaultSettings';
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
  getCostCodes(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getCostCodes, null);
  }
  getVoucherType(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getVoucherType, null);
  }
  getCashier(): Observable<any> {
    return this.http.post<any>(SettingsEndpoints.getCashier, null);
  }
  createVoucherType(voucherType: any): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<any>(
      SettingsEndpoints.createVoucherType,
      voucherType,
      { headers }
    );
  }
}
