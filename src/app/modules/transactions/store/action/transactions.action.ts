import { Voucher } from 'src/app/models/voucher';

export class ListVoucher {
  static readonly type = '[TransactionsState] ListVoucher';
  constructor(public readonly payload?: Voucher) {}
}

export class CreateVoucher {
  static readonly type = '[TransactionsState] CreateVoucher';
  constructor(public readonly payload?: Voucher) {}
}
