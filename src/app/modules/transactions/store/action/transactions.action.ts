import { ChartOfAccountModel, PaymentVoucher, VoucherHeader, VoucherHeaderPost } from 'src/app/models/defaultSettings';
import { Voucher } from 'src/app/models/voucher';

export class ListVoucher {
  static readonly type = '[TransactionsState] ListVoucher';
  constructor(public readonly payload?: Voucher) {}
}

export class ListAccounts {
  static readonly type = '[TransactionsState] ListAccounts';
  constructor(public readonly payload?: any) {}
}

export class ListCostCenter {
  static readonly type = '[TransactionsState] ListCostCenter';
  constructor(public readonly payload?: any) {}
}

export class ListVoucherType {
  static readonly type = '[TransactionsState] ListVoucherType';
  constructor(public readonly payload?: any) {}
}

export class ListPaymentVoucherType {
  static readonly type = '[TransactionsState] ListPaymentVoucherType';
  constructor(public readonly payload?: any) {}
}

export class ListCollectionVoucherType {
  static readonly type = '[TransactionsState] ListCollectionVoucherType';
  constructor(public readonly payload?: any) {}
}

export class ListModePayment {
  static readonly type = '[TransactionsState] ListModePayment';
  constructor(public readonly payload?: any) {}
}

export class GetVoucherHeaderDetail {
  static readonly type = '[TransactionsState] GetVoucherHeaderDetail';
  constructor(public payload: any) {}
}

export class GetTransactionDetail {
  static readonly type = '[TransactionsState] GetTransactionDetail';
  constructor(public payload: VoucherHeader[]) {}
}

export class GetVoucherDetail {
  static readonly type = '[TransactionsState] GetVoucherDetail';
  constructor(public payload: any) {}
}

export class GetDefaultAccount {
  static readonly type = '[TransactionsState] GetDefaultAccount';
  constructor(public payload: any) {}
}

export class CreateVoucher {
  static readonly type = '[TransactionsState] CreateVoucher';
  constructor(public readonly payload?: Voucher) {}
}
export class ListChartsOfAccount {
  static readonly type = '[TransactionsState] ListChartsOfAccount';
  constructor(public readonly payload?: any) {}
}

export class GetChildChartOfAccounts {
  static readonly type = '[TransactionsState] GetChildChartOfAccounts';
  constructor(public readonly payload?: ChartOfAccountModel) {}
}

export class listFinancialTransaction {
  static readonly type = '[TransactionsState] listFinancialTransaction';
  constructor(public readonly payload?: any) {}
}
export class listCollectionVoucher {
  static readonly type = '[TransactionsState] listCollectionVoucher';
  constructor(public readonly payload?: any) {}
}

export class ListBankReconciliation {
  static readonly type = '[TransactionsState] ListBankReconciliation';
  constructor(public readonly payload?: any) {}
}

export class ListSettelementHeaders {
  static readonly type = '[TransactionsState] ListSettelementHeaders';
  constructor(public readonly payload?: any) {}
}

export class ListSlaAccount {
  static readonly type = '[TransactionsState] ListSlaAccount';
  constructor(public readonly payload?: any) {}
}

export class ListPaymentHeaders {
  static readonly type = '[TransactionsState] ListPaymentHeaders';
  constructor(public readonly payload?: any) {}
}

export class listPaymentVoucher {
  static readonly type = '[TransactionsState] listPaymentVoucher';
  constructor(public readonly payload?: any) {}
}

export class ListPurposeTemplates {
  static readonly type = '[TransactionsState] ListPurposeTemplates';
  constructor(public readonly payload?: any) {}
}

export class GetLookups {
  static readonly type = '[TransactionsState] GetLookups';
  constructor(public readonly payload?: any) {}
}

export class GetVoucherNumber {
  static readonly type = '[TransactionsState] GetVoucherNumber';
  constructor(public readonly payload?: any, public readonly payload2?: any ) {}
}

export class CreatePaymentVoucher {
  static readonly type = '[TransactionsState] CreatePaymentVoucher';
  constructor(public readonly payload?: PaymentVoucher) {}
}

export class CreateCollectionVoucher {
  static readonly type = '[TransactionsState] CreateCollectionVoucher';
  constructor(public readonly payload?: PaymentVoucher) {}
}

export class DeletePaymentVoucher {
  static readonly type = '[TransactionsState] DeletePaymentVoucher';
  constructor(public readonly payload?: PaymentVoucher) {}
}

export class DeleteVoucherDetail{
  static readonly type = '[TransactionsState] DeleteVoucherDetail';
  constructor(public readonly payload ? : any){}
}

export class DeleteCollectionVoucher {
  static readonly type = '[TransactionsState] DeletePaymentVoucher';
  constructor(public readonly payload?: PaymentVoucher) {}
}

export class PostTransaction {
  static readonly type = '[TransactionsState] PostTransaction';
  constructor(public readonly payload? : VoucherHeader[]){}
}

export class UnPostTransaction {
  static readonly type = '[TransactionsState] UnPostTransaction';
  constructor(public readonly payload? : VoucherHeader[]){}

}

export class VoidTransaction {
  static readonly type = '[TransactionsState] VoidTransaction';
  constructor(public readonly payload? : VoucherHeader[]){}

}

export class DeleteTransaction {
  static readonly type = '[TransactionsState] DeleteTransaction';
  constructor(public readonly payload? : VoucherHeader[]){}

}

export class AdjustTransaction {
  static readonly type = '[TransactionsState] AdjustTransaction';
  constructor(public readonly payload? : VoucherHeader){}

}

export class GetJVNumber {
  static readonly type = '[TransactionsState] GetJVNumber';
  constructor(public readonly payload? : any){}

}

export class SaveVoucher {
  static readonly type = '[TransactionsState] SaveVoucher';
   constructor(public readonly payload? : VoucherHeaderPost ){}
}

export class SaveChildChartAccount {
  static readonly type = '[TransactionsState] SaveChildChartAccount';
   constructor(public readonly payload? : ChartOfAccountModel ){}
}


