import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Voucher } from '../../../../models/voucher';
import { TransactionsApiService } from '../../apis/transactions.api.service';
import {
  CreateCollectionVoucher,
  CreatePaymentVoucher,
  CreateVoucher,
  listBankReconciliation,
  ListChartsOfAccount,
  listCollectionVoucher,
  listFinancialTransaction,
  listPaymentVoucher,
  ListVoucher,
} from './../action/transactions.action';

export interface TransactionsStateModel {
  createVoucher: Voucher;
  listVoucher: Voucher;
  listChartsOfAccount: any;
  listFinancialTransaction: any;
  listCollectionVoucher: any;
  listBankReconciliation: any;
  listPaymentVoucher: any;
  createPaymentVoucher: any;
  createCollectionVoucher: any;
  loading: boolean;
}

@State<TransactionsStateModel>({
  name: 'TransactionsState',
  defaults: {
    createVoucher: undefined,
    listVoucher: undefined,
    listFinancialTransaction: undefined,
    listCollectionVoucher: undefined,
    listBankReconciliation: undefined,
    listChartsOfAccount: undefined,
    listPaymentVoucher: undefined,
    createPaymentVoucher: undefined,
    createCollectionVoucher: undefined,
    loading: undefined,
  },
})
@Injectable()
export class TransactionsState {
  constructor(
    private readonly TransactionsApiService: TransactionsApiService
  ) {}

  @Selector() public static chartsOfAccount(
    state: TransactionsStateModel
  ): any {
    return state.listChartsOfAccount;
  }

  @Selector() public static listFinancialTransaction(
    state: TransactionsStateModel
  ): any {
    return state.listFinancialTransaction;
  }
  @Selector() public static listCollectionVoucher(
    state: TransactionsStateModel
  ): any {
    return state.listCollectionVoucher;
  }
  @Selector() public static listBankReconciliation(
    state: TransactionsStateModel
  ): any {
    return state.listBankReconciliation;
  }
  @Selector() public static listPaymentVoucher(
    state: TransactionsStateModel
  ): any {
    return state.listPaymentVoucher;
  }
  @Selector() public static listVoucher(state: TransactionsStateModel): any {
    return state.listVoucher;
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

  @Action(ListChartsOfAccount) listChartsOfAccount(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: ListChartsOfAccount
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.getChartsOfAccount().pipe(
      tap((item: any) => {
        patchState({ listChartsOfAccount: item.Data, loading: false });
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

  @Action(CreatePaymentVoucher) createPaymentVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: any
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.createPaymentVoucher(payload).pipe(
      tap((result: any) => {
        patchState({ createVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }

  @Action(CreateCollectionVoucher) createCollectionVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: any
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.createCollectionVoucher(payload).pipe(
      tap((result: any) => {
        patchState({ createCollectionVoucher: result, loading: false });
      }),
      catchError((error) => of(patchState({ loading: false })))
    );
  }
}
