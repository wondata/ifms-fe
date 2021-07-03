import { Voucher } from 'src/app/models/voucher';

export class ListVoucher {
  static readonly type = '[TransactionsState] ListVoucher';
  constructor(public readonly payload?: Voucher) {}
}

export class CreateVoucher {
  static readonly type = '[TransactionsState] CreateVoucher';
  constructor(public readonly payload?: Voucher) {}
}
export class ListChartsOfAccount {
  static readonly type = '[TransactionsState] ListChartsOfAccount';
  constructor(public readonly payload?: any) {}
}

export class listFinancialTransaction {
  static readonly type = '[TransactionsState] listFinancialTransaction';
  constructor(public readonly payload?: any) {}
}
export class listCollectionVoucher {
  static readonly type = '[TransactionsState] listCollectionVoucher';
  constructor(public readonly payload?: any) {}
}

export class listBankReconciliation {
  static readonly type = '[TransactionsState] listBankReconciliation';
  constructor(public readonly payload?: any) {}
}
export class listPaymentVoucher {
  static readonly type = '[TransactionsState] listPaymentVoucher';
  constructor(public readonly payload?: any) {}
}

export class CreatePaymentVoucher {
  static readonly type = '[TransactionsState] CreatePaymentVoucher';
  constructor(public readonly payload?: any) {}
}

export class CreateCollectionVoucher {
  static readonly type = '[TransactionsState] CreateCollectionVoucher';
  constructor(public readonly payload?: any) {}
}
