import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LookupModel, PaymentVoucher, VoucherHeader, VoucherHeaderPost } from 'src/app/models/defaultSettings';
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
  getVoucherType (): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.getVoucherType, null);
  }
  getPaymentVoucherTypes (): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.getPaymentVoucherTypes, null);
  }
  getCollectionVoucherTypes (): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.getCollectionVoucherTypes, null);
  }
  getModePayment (): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.getModePayment, null);
  }
  getCostCenter(): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.getCostCenter, null);
  }


  getVoucherHeaderDetail(voucher: Voucher): Observable<any> {

    return this.http.post<Voucher[]>(TransactionsEndpoints.getVoucherHeaderDetail, voucher)
      .pipe(
        map((data) => {
          return data;
        }),
      );
  }

  getTransactionDetail(voucher: VoucherHeader[]): Observable<any> {

    return this.http.post<VoucherHeader[]>(TransactionsEndpoints.getTransactionDetail, voucher)
      .pipe(
        map((data) => {
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

  listPurposeTemplates(): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.listPurposeTemplates, null);
  }

  listAccounts(): Observable<any> {
    return this.http.post<any>(TransactionsEndpoints.listAccounts, null);
  }


  getLookups(lookupName: string): Observable<LookupModel[]> {
    return this.http.post<LookupModel[]>(TransactionsEndpoints.getLookups, {"LookupName" :lookupName})
    .pipe(
      map((data) => {
        return data;
      }),
    );
  }

  getDefaultAccount(VoucherTypeId: string): Observable<any[]> {
    return this.http.post<any[]>(TransactionsEndpoints.getDefaultAccount, {"VoucherTypeId" :VoucherTypeId})
    .pipe(
      map((data) => {
        return data;
      }),
    );
  }

  getVoucherNumber(CostCenterId: string, VoucherTypeId: string): Observable<any[]> {
    return this.http.post<any[]>(TransactionsEndpoints.getVoucherNumber, {"CostCenterId" :CostCenterId , "VoucherTypeId" :VoucherTypeId })
    .pipe(
      map((data) => {
        return data;
      }),
    );
  }

  createPaymentVoucher(paymentVoucher: PaymentVoucher): Observable<any> {
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

  createCollectionVoucher(collectionVoucher: PaymentVoucher): Observable<any> {
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

  deletePaymentVoucher(voucherHeader: PaymentVoucher): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader>(
      TransactionsEndpoints.deletePaymentVoucher,
      voucherHeader,
      { headers }
    );
  }

  deleteCollectionVoucher(voucherHeader: PaymentVoucher): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader>(
      TransactionsEndpoints.deleteCollectionVoucher,
      voucherHeader,
      { headers }
    );
  }

  deleteVoucherDetail(voucherHeaderId: any): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader>(
      TransactionsEndpoints.deleteVoucherDetail,
      {"Id" :voucherHeaderId},
      { headers }
    );
  }

  postTransaction(transaction: VoucherHeader[]): Observable<any[]> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader[]>(
      TransactionsEndpoints.postTranasaction,
      transaction,
      { headers }
    );
  }

  unpostTransaction(transaction: VoucherHeader[]): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader[]>(
      TransactionsEndpoints.unpostTranasaction,
      transaction,
      { headers }
    );
  }

  voidTransaction(transaction: VoucherHeader[]): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader[]>(
      TransactionsEndpoints.voidTranasaction,
      transaction,
      { headers }
    );
  }

  deleteTransaction(transaction: VoucherHeader[]): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader[]>(
      TransactionsEndpoints.deleteTranasaction,
      transaction,
      { headers }
    );
  }

  adjustTransaction(transaction: VoucherHeader): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<VoucherHeader[]>(
      TransactionsEndpoints.adjustTranasaction,
      transaction,
      { headers }
    );
  }

  getJVNumber(Id: string): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );
    return this.http.post<any>(
      TransactionsEndpoints.getJvNumber,
      {"Id" :Id},
      { headers }
    );
  }

    saveVoucher(
    voucherHeaderPost: VoucherHeaderPost
     ): Observable<any> {
    const headers = new HttpHeaders().set(
      this.contentType,
      this.contentApplication
    );

    return this.http.post<any>(
      TransactionsEndpoints.saveVoucher,
      voucherHeaderPost,
      { headers }
    );
  }




}
