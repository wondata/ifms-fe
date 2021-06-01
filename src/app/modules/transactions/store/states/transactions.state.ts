import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Voucher } from '../../../../models/voucher';
import { TransactionsApiService } from '../../apis/transactions.api.service';
import { CreateVoucher, ListVoucher } from './../action/transactions.action';

export interface TransactionsStateModel {
  createVoucher: Voucher;
  listVoucher: Voucher;
  loading: boolean;
}

@State<TransactionsStateModel>({
  name: 'TransactionsState',
  defaults: {
    createVoucher: undefined,
    listVoucher: undefined,
    loading: undefined,
  },
})
@Injectable()
export class TransactionsState {
  constructor(
    private readonly TransactionsApiService: TransactionsApiService
  ) {}

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
}
