import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LookupModel, PaymentVoucher, VoucherHeader } from 'src/app/models/defaultSettings';
import { Voucher } from '../../../../models/voucher';
import { VoucherDetail } from '../../../../models/VoucherDetail';
import { TransactionsApiService } from '../../apis/transactions.api.service';
import {
  AdjustTransaction, CreateCollectionVoucher, CreatePaymentVoucher, CreateVoucher,
  DeleteCollectionVoucher, DeletePaymentVoucher, GetDefaultAccount, GetJVNumber, GetLookups, GetTransactionDetail,
  GetVoucherDetail, GetVoucherHeaderDetail, GetVoucherNumber, ListAccounts, listBankReconciliation,
  ListChartsOfAccount, listCollectionVoucher, ListCollectionVoucherType, ListCostCenter, listFinancialTransaction, ListModePayment,
  listPaymentVoucher, ListPaymentVoucherType, ListPurposeTemplates, ListVoucher, ListVoucherType, PostTransaction, SaveVoucher,
  UnPostTransaction, VoidTransaction, DeleteVoucherDetail, DeleteTransaction
} from './../action/transactions.action';

export interface TransactionsStateModel {
    createVoucher: Voucher;
    listVoucher: Voucher;
    getVoucherHeaderDetail: Voucher;
    getVoucherDetail : VoucherDetail;
    getTransactionDetail : VoucherHeader[];
    postTransaction : VoucherHeader[];
    unpostTransaction : VoucherHeader[];
    adjustTransaction : VoucherHeader;
    voidTransaction : VoucherHeader[];
    deleteTransaction: VoucherHeader[];
    getJVNumber : any;
    getVoucherNumber : any;
    saveVoucher: any;
    deleteVoucherDetail : any;
    getDefaultAccount : any;
    listChartsOfAccount: any;
    listFinancialTransaction: any;
    listCollectionVoucher: any;
    listBankReconciliation: any;
    listPaymentVoucher: any;
    listPurposeTemplates : any;
    listAccounts: any;
    createPaymentVoucher: PaymentVoucher;
    createCollectionVoucher: any;
    deletePaymentVoucher : PaymentVoucher;
    deleteCollectionVoucher : PaymentVoucher;
    listVoucherType: any;
    listPaymentVoucherType : any;
    listCollectionVoucherType : any;
    listModePayment : any;
    listCostCenter: any;
    getLookups: any;
    loading: boolean;
  }

@State<TransactionsStateModel>({
  name: 'TransactionsState',
  defaults: {
    createVoucher: undefined,
    listVoucher: undefined,
    getVoucherHeaderDetail: undefined,
    getVoucherDetail : undefined,
    getTransactionDetail : undefined,
    deletePaymentVoucher : undefined,
    deleteCollectionVoucher : undefined,
    postTransaction : undefined,
    unpostTransaction : undefined,
    adjustTransaction : undefined,
    voidTransaction : undefined,
    deleteTransaction : undefined,
    getJVNumber : undefined,
    getVoucherNumber : undefined,
    saveVoucher: undefined,
    deleteVoucherDetail : undefined,
    getDefaultAccount : undefined,
    listFinancialTransaction: undefined,
    listCollectionVoucher: undefined,
    listBankReconciliation: undefined,
    listChartsOfAccount: undefined,
    listPurposeTemplates : undefined,
    listPaymentVoucher: undefined,
    listAccounts: undefined,
    createPaymentVoucher: undefined,
    createCollectionVoucher: undefined,
    listVoucherType: undefined,
    listPaymentVoucherType: undefined,
    listCollectionVoucherType : undefined,
    listCostCenter: undefined,
    listModePayment : undefined,
    getLookups: undefined,
    loading: undefined,

  },
})
@Injectable()
export class TransactionsState {
  constructor(
    private readonly TransactionsApiService: TransactionsApiService
  ) {}

  @Selector()
  public static chartsOfAccount(
    state: TransactionsStateModel
  ): any {
    return state.listChartsOfAccount;
  }

  @Selector()
  public static listFinancialTransaction(
    state: TransactionsStateModel
  ): any {
    return state.listFinancialTransaction;
  }
  @Selector()
  public static listCollectionVoucher(
    state: TransactionsStateModel
  ): any {
    return state.listCollectionVoucher;
  }
  @Selector()
  public static listBankReconciliation(
    state: TransactionsStateModel
  ): any {
    return state.listBankReconciliation;
  }
  @Selector()
  public static listPaymentVoucher(
    state: TransactionsStateModel
  ): any {
    return state.listPaymentVoucher;
  }

  @Selector()
  public static getJVNumber(
    state: TransactionsStateModel
  ): any {
    return state.getJVNumber;
  }

  @Selector()
  public static listVoucher(state: TransactionsStateModel): any {
    return state.listVoucher;
  }
  @Selector()
  public static listAccounts(state: TransactionsStateModel): any {
    return state.listAccounts;
  }

  @Selector()
  public static getVoucherHeader(state: TransactionsStateModel): any {
    return state.getVoucherHeaderDetail;
  }

  @Selector()
  public static getVoucherDetail(state: TransactionsStateModel): any {
    return state.getVoucherDetail;
  }

  @Selector()
  public static getTransactionDetail(state: TransactionsStateModel): any {
    return state.getTransactionDetail;
  }

  @Selector()
  public static listVoucherType(state: TransactionsStateModel): any {
    return state.listVoucherType;
  }

  @Selector()
  public static listPaymentVoucherType(state: TransactionsStateModel): any {
    return state.listPaymentVoucherType;
  }

  @Selector()
  public static listCollectionVoucherType(state: TransactionsStateModel): any {
    return state.listCollectionVoucherType;
  }

  @Selector()
  public static listModePayment(state: TransactionsStateModel): any {
    return state.listModePayment;
  }

  @Selector()
  public static listPurposeTemplates(state: TransactionsStateModel): any {
    return state.listPurposeTemplates;
  }

  @Selector()
  public static listCostCenter(state: TransactionsStateModel): any {
    return state.listCostCenter;
  }

  @Selector()
  public static getLookups(state: TransactionsStateModel): any {
    return state.getLookups;
  }

  @Selector()
  public static getVoucherNumber(state: TransactionsStateModel): any {
    return state.getVoucherNumber;
  }

  @Selector()
  public static getDefaultAccount(state: TransactionsStateModel): any {
    return state.getDefaultAccount;
  }

  @Selector()
  public static saveVoucher(state: TransactionsStateModel): any {
    return state.saveVoucher;
  }

  @Selector()
  public static deleteVoucherDetail(state: TransactionsStateModel): any {
    return state.deleteVoucherDetail;
  }


 @Action(ListVoucherType) getVoucherType({
    patchState, }: StateContext<TransactionsStateModel>): any {
    return this.TransactionsApiService.getVoucherType().pipe(
      tap((item: any) => {
        patchState({ listVoucherType: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListPaymentVoucherType) getPaymentVoucherTypes({
    patchState, }: StateContext<TransactionsStateModel>): any {
    return this.TransactionsApiService.getPaymentVoucherTypes().pipe(
      tap((item: any) => {
        patchState({ listPaymentVoucherType: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListCollectionVoucherType) getCollectionVoucherTypes({
    patchState, }: StateContext<TransactionsStateModel>): any {
    return this.TransactionsApiService.getCollectionVoucherTypes().pipe(
      tap((item: any) => {
        patchState({ listCollectionVoucherType: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListAccounts) listAccounts(
    { patchState }: StateContext<TransactionsStateModel>,
      payload: any
      ): any {
        patchState({
          loading: true,
        });

    return this.TransactionsApiService.listAccounts().pipe(
      tap((item: any) => {
        patchState({ listAccounts: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListModePayment) listModePayment({
    patchState, }: StateContext<TransactionsStateModel>): any {
    return this.TransactionsApiService.getModePayment().pipe(
      tap((item: any) => {
        patchState({ listModePayment: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListPurposeTemplates) listPurposeTemplates({
    patchState, }: StateContext<TransactionsStateModel>): any {
    return this.TransactionsApiService.listPurposeTemplates().pipe(
      tap((item: any) => {
        patchState({ listPurposeTemplates: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

   @Action(ListCostCenter) listCostCenter(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: any ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getCostCenter().pipe(
      tap((item: any) => {
        patchState({ listCostCenter: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetLookups) getLookups(
    { patchState }: StateContext<TransactionsStateModel>,
      payload: GetLookups
      ): any {
        patchState({
          loading: true,
        });

    return this.TransactionsApiService.getLookups(payload.payload).pipe(
      tap((item: LookupModel[]) => {
        patchState({ getLookups: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetVoucherNumber) getVoucherNumber(
    { patchState }: StateContext<TransactionsStateModel>,
      payload: GetVoucherNumber
      ): any {
        patchState({
          loading: true,
        });

    return this.TransactionsApiService.getVoucherNumber(payload.payload, payload.payload2 ).pipe(
      tap((item: any) => {
        patchState({ getVoucherNumber: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetDefaultAccount) getDefaultAccount(
    { patchState }: StateContext<TransactionsStateModel>,
      payload: GetDefaultAccount
      ): any {
        patchState({
          loading: true,
        });

    return this.TransactionsApiService.getDefaultAccount(payload.payload ).pipe(
      tap((item: any) => {
        patchState({ getDefaultAccount: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }


  @Action(CreateVoucher) createVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
      payload: Voucher
    ): any {
      patchState({
        loading: true,
    });

    return this.TransactionsApiService.createVoucher(payload).pipe(
      tap((result: Voucher) => {
        patchState({ createVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(SaveVoucher) saveVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
      payload: SaveVoucher,
    ): any {
      patchState({
        loading: true,
    });

    return this.TransactionsApiService.saveVoucher(payload.payload).pipe(
      tap((result: any) => {
        patchState({ saveVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetVoucherHeaderDetail)
  getVoucherHeaderDetail({ patchState }: StateContext<TransactionsStateModel>,
      payload : GetVoucherHeaderDetail
    ): any {
      patchState({
        loading: true,
      });

    return this.TransactionsApiService.getVoucherHeaderDetail(payload.payload).pipe(
      tap((result: Voucher) => {
        patchState({ getVoucherHeaderDetail: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetTransactionDetail)
  getTransactionDetail({ patchState }: StateContext<TransactionsStateModel>,
      payload : GetTransactionDetail
    ): any {
      patchState({
        loading: true,
      });

    return this.TransactionsApiService.getTransactionDetail(payload.payload).pipe(
      tap((result: VoucherHeader[]) => {
        patchState({ getTransactionDetail: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetVoucherDetail)
  getVoucherDetail({ patchState }: StateContext<TransactionsStateModel>,
      payload : GetVoucherDetail
    ): any {
      patchState({
        loading: true,
      });

    return this.TransactionsApiService.getVoucherDetail(payload.payload).pipe(
      tap((result: any) => {
        patchState({ getVoucherDetail: result.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListChartsOfAccount) listChartsOfAccount(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: ListChartsOfAccount
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getChartsOfAccount().pipe(
      tap((item: any) => {
        patchState({ listChartsOfAccount: item, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(ListVoucher) listVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: ListVoucher
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getVoucherList().pipe(
      tap((item: any) => {
        patchState({ listVoucher: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(listFinancialTransaction) listFinancialTransaction(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: listFinancialTransaction
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getFinancialTransaction().pipe(
      tap((item: any) => {
        patchState({ listFinancialTransaction: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(listCollectionVoucher) listCollectionVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: listCollectionVoucher
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getCollectionVoucher().pipe(
      tap((item: any) => {
        patchState({ listCollectionVoucher: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(listBankReconciliation) listBankReconciliation(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: listBankReconciliation
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getBankReconciliation().pipe(
      tap((item: any) => {
        patchState({ listBankReconciliation: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(listPaymentVoucher) listPaymentVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: listPaymentVoucher
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getPaymentVoucher().pipe(
      tap((item: any) => {
        patchState({ listPaymentVoucher: item.Data, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(CreateCollectionVoucher) createCollectionVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: CreateCollectionVoucher
    ): any {
      patchState({
        loading: true,
      });

    return this.TransactionsApiService.createCollectionVoucher(payload.payload).pipe(
      tap((result: PaymentVoucher) => {
        patchState({ createCollectionVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(CreatePaymentVoucher) createPaymentVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: CreatePaymentVoucher
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.createPaymentVoucher(payload.payload).pipe(
      tap((result: PaymentVoucher) => {
        patchState({ createPaymentVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(DeletePaymentVoucher) deletePaymentVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: DeletePaymentVoucher
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.deletePaymentVoucher(payload.payload).pipe(
      tap((result: PaymentVoucher) => {
        patchState({ deletePaymentVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(DeleteCollectionVoucher) deleteCollectionVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: DeletePaymentVoucher
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.deleteCollectionVoucher(payload.payload).pipe(
      tap((result: PaymentVoucher) => {
        patchState({ deleteCollectionVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(DeleteVoucherDetail) deleteVoucherDetail(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: DeleteVoucherDetail
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.deleteVoucherDetail(payload.payload).pipe(
      tap((result: any) => {
        patchState({ deleteVoucherDetail: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

    @Action(PostTransaction) postTransaction(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: PostTransaction
    ): any {
      patchState({
        loading: true,
    });

    return this.TransactionsApiService.postTransaction(payload.payload).pipe(
      tap((result: VoucherHeader[]) => {
        patchState({ postTransaction: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

    @Action(UnPostTransaction) unpostTransaction(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: UnPostTransaction
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.unpostTransaction(payload.payload).pipe(
      tap((result: VoucherHeader[]) => {
        patchState({ unpostTransaction: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

    @Action(VoidTransaction) voidTransaction(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: VoidTransaction
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.voidTransaction(payload.payload).pipe(
      tap((result: VoucherHeader[]) => {
        patchState({ voidTransaction: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(DeleteTransaction) deleteTransaction(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: DeleteTransaction
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.deleteTransaction(payload.payload).pipe(
      tap((result: VoucherHeader[]) => {
        patchState({ deleteTransaction: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

    @Action(AdjustTransaction) adjustTransaction(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: AdjustTransaction
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.adjustTransaction(payload.payload).pipe(
      tap((result: VoucherHeader) => {
        patchState({ adjustTransaction : result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(GetJVNumber) getJVNumber(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: GetJVNumber
  ): any {
    patchState({
      loading: true,
    });
    return this.TransactionsApiService.getJVNumber(payload.payload).pipe(
      tap((result: any) => {
        patchState({ getJVNumber : result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }




}
