import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { voucherType } from './../../../models/defaultSettings';
import { SettingsEndpoints } from './settings.endpoint';

@Injectable()
export class SettingsApiService {
  constructor(private readonly http: HttpClient) {}

  contentType = 'Content-Type';
  contentApplication = 'application/json';

  voucherType(): Observable<any> {
    return this.http.get<voucherType>(SettingsEndpoints.voucherType).pipe(
      map((value: any) => {
        return value.reduce((a, x) => ({ ...a, [x.value]: x.name }), {});
      })
    );
  }
}
