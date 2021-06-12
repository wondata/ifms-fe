import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Voucher } from '../../../../models/voucher';
import { TransactionsApiService } from '../../apis/transactions.api.service';
import {
  CreateVoucher,
  ListChartsOfAccount,
  ListVoucher,
} from './../action/transactions.action';

export interface TransactionsStateModel {
  createVoucher: Voucher;
  listVoucher: Voucher;
  listChartsOfAccount: any;
  loading: boolean;
}

@State<TransactionsStateModel>({
  name: 'TransactionsState',
  defaults: {
    createVoucher: undefined,
    listVoucher: undefined,
    listChartsOfAccount: undefined,
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

  @Action(ListVoucher) listVoucher(
    { patchState }: StateContext<TransactionsStateModel>,
    payload: Voucher
  ): any {
    patchState({
      loading: true,
    });

    return this.TransactionsApiService.listVoucher().pipe(
      tap((item: any) => {
        patchState({ listVoucher: item, loading: false });
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
}
