import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher } from 'src/app/models/voucher';
import { TransactionsEndpoints } from './transactions.endpoint';

@Injectable()
export class TransactionsApiService {
  constructor(private readonly http: HttpClient) {}

  contentType = 'Content-Type';
  contentApplication = 'application/json';

  createVoucher(voucher: Voucher): Observable<Voucher> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<Voucher>(
      TransactionsEndpoints.createVoucher,
      voucher,
      { headers }
    );
  }
  getChartsOfAccount(): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.listChartsOfAccount, null);
  }
  getVoucherList(): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.listVoucher, null);
  }
  getFinancialTransaction(): Observable<any> {
    return this.http.post<any>(
      TransactionsEndpoints.listFinancialTransaction,
      null
    );
  }
  getCollectionVoucher(): Observable<any> {
    return this.http.post<any>(
      TransactionsEndpoints.listCollectionVoucher,
      null
    );
  }
  getBankReconciliation(): Observable<any> {
    return this.http.post<any>(
      TransactionsEndpoints.listBankReconciliation,
      null
    );
  }
  getPaymentVoucher(): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.listPaymentVoucher, null);
  }

  createPaymentVoucher(paymentVoucher: any): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<Voucher>(
      TransactionsEndpoints.createPaymentVoucher,
      paymentVoucher,
      { headers }
    );
  }

  createCollectionVoucher(collectionVoucher: any): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<Voucher>(
      TransactionsEndpoints.createCollectionVoucher,
      collectionVoucher,
      { headers }
    );
  }
}
