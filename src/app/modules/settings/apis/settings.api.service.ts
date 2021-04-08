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

  // getAllUsers(query: Query = {}): Observable<Paginated<Employee>> {
  //   query.size = query.size ?? 10;
  //   query.sort = query.sort ?? 'id,desc';

  //   return this.http.get<Paginated<Employee>>(userManagementEndpoints.list, { params: (query as unknown) as { [param: string]: string } });
  // }
  voucherType(): Observable<any> {
    return this.http.get<voucherType>(SettingsEndpoints.voucherType).pipe(
      map((value: any) => {
        return value.reduce((a, x) => ({ ...a, [x.value]: x.name }), {});
      })
    );
  }
}
