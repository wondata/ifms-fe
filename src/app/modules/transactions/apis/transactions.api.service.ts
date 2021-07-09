import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Voucher } from 'src/app/models/voucher';
import { VoucherDetail } from 'src/app/models/voucherdetail';
import { TransactionsEndpoints } from './transactions.endpoint';


@Injectable()
export class TransactionsApiService {
  constructor(private readonly http: HttpClient) {}

  contentType = 'Content-Type';
  contentApplication = 'application/json';

  httpOptions = {
    headers: new HttpHeaders({})
  }

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

  getVoucherHeaderDetail(voucher: Voucher): Observable<any> {

    return this.http.post<Voucher[]>(TransactionsEndpoints.getVoucherHeaderDetail, voucher)
    .pipe(
      map((data) => {
        //  return this.mapToVoucherDetailViewModel(data);
        return data;
      }),
    );

  }

  getVoucherDetail(voucher: VoucherDetail): Observable<any> {

    return this.http.post<VoucherDetail[]>(TransactionsEndpoints.getVoucherDetail, voucher)
    .pipe(
      map((data) => {
        return data;
      }),
    );

  }

  mapToVoucherDetailViewModel(positions: VoucherDetail[]): VoucherDetail[] {
    const result = [] as VoucherDetail[];
    if (positions === null || positions === undefined) return result;

    positions.forEach((element) => {
      const vm = {} as VoucherDetail;
        vm.Id = element.Id;
        vm.VoucherHeaderId = element.VoucherHeaderId;
        vm.SNo = element.SNo;
        vm.CostCenterId= element.CostCenterId;
        vm.CaseId = element.CaseId;
        vm.CostCodeId = element.CostCodeId;
        vm.DebitAmount = element.DebitAmount;
        vm.CreditAmount = element.CreditAmount;

      result.push(vm);
    });

    return result;
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
