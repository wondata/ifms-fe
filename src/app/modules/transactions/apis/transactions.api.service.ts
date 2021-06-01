import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Voucher } from 'src/app/models/voucher';
import { GeneralSettings } from './../../../models/defaultSettings';
import { TransactionsEndpoints } from './transactions.endpoint';

@Injectable()
export class TransactionsApiService {
  constructor(private readonly http: HttpClient) {}

  contentType = 'Content-Type';
  contentApplication = 'application/json';

  listVoucher(): Observable<Voucher> {
    return this.http.get<Voucher>(TransactionsEndpoints.listVoucher).pipe(
      map((value: any) => {
        return value.reduce((a, x) => ({ ...a, [x.value]: x.name }), {});
      })
    );
  }

  createVoucher(voucher: Voucher): Observable<Voucher> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<GeneralSettings>(
      TransactionsEndpoints.createVoucher,
      voucher,
      { headers }
    );
  }
}
