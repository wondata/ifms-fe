export interface GeneralSettings {
  IncomeSummaryAccountId: string;
  ClosingCapitalAccountId: string;
  DefaultCostCenterId: string;
  InterBranchControlAccountId: string;
}

export interface FixedAssetSettings {
  DefaultCostCenterId: string,
  DefualtVoucherTypeId: string;
  GainOnDisposalAccountId: string;
  LossOnDisposalAccountId: string;
  CashAccountId: string;
}

export interface VoucherType {
  costCenter: string;
  voucherType: string;
  defaultAccount: string;
  accountTitle: string;
  balanceSide: string;
  startingNumber: Number;
  currentNumber: Number;
  numberOfDigits: Number;
}

export interface VoucherTypeSetting {
  CostCenterId: string;
  VoucherTypeId: string;
  DefaultAccountId: string;
  BalanceSideId: string;
  StartingNumber: Number;
  CurrentNumber: Number;
  NumberOfDigits: Number;
}

export interface SubsidiaryAccount {
  Id : string;
  ControlAccount: [];
  SubsidiaryAccountTypeId: string;
  ControlAccountId: string;
  BalanceSideId: string;
  Code: string;
  Name: string;
  IsDeleted : string;
  CreatedBy : string;
  CreatedAt : string;
  RunningBalance: Number;
}

export interface StatusResponse {
  Message: string;
  ResponseStatus: string;
}

export interface ChartOfAccountModel {
    Id: string;
    Name?: string;
    Code?: string;
    Type: string;
    ParentId?: string;
    CompanyId? : string;
}


export interface voucherType {}
export interface CostCode {
  Id?: string;
  Name?: string;
  Code?: string;
}

export interface Users {
  Id?: string;
  FirstName?: string;
  LastName?: string;
  UserName : string;
  IsInactive : boolean;
}

export interface Cashier {
  Id?: string;
  FullName: string;
  SubsidiaryAccountId: string;
  UserId : string;
  IsDeleted : boolean;
}

export interface LookupModel {
    Id: string;
    Name: string;
    Code: string;
    text:string;
    value: string;
}

export interface CostCenter {
    Id: string;
    Name: string;
    Code: string;
    text:string;
    value: string;
    ParentId: string;
}

export interface LookupRequestModel {
    LookupName: string;
}

export interface VoucherHeader {
      Id : string;
      CostCenterId ?: string;
      VoucherTypeId : string;
      ReferenceNo : string;
      DocumentNo : string;
      Date : string;
      PeriodId : string;
      PayedToReceivedFrom : string;
      PurposeTemplateId : string;
      Description : string;
      Amount : Number;
      TaxId : string;
      ModeOfPaymentId : string;
      ChequeNo : string;
      IsPosted : boolean;
      IsAdjustment : boolean;
      IsVoid : boolean;
      PostedFromOperation : string;
      AuthorizedDate : string;
}

export interface VoucherHeaderPost {
      Id : string;
      CostCenterId ?: string;
      VoucherTypeId : string;
      ReferenceNo : string;
      DocumentNo : string;
      Date : string;
      PeriodId : string;
      PayedToReceivedFrom : string;
      PurposeTemplateId : string;
      Description : string;
      Amount : Number;
      TaxId : string;
      ModeOfPaymentId : string;
      ChequeNo : string;
      IsPosted : boolean;
      IsAdjustment : boolean;
      IsVoid : boolean;
      PostedFromOperation : string;
      AuthorizedDate : string;
      VoucherDetails : VoucherDetail[];
}

export interface VoucherDetail {
      Id : string;
      VoucherHeaderId ?: string;
      SNo : Number;
      CostCenterId : string;
      CaseId : string;
      CostCodeId : string;
      ControlAccountId : string;
      SubsidiaryAccountId : string;
      DebitAmount : Number;
      CreditAmount : Number;
      Remark : string;
      IsReconciled : boolean;
      ReferenceVoucherHeaderId : string;
      BankReconciliationId : string;
      IsInterBranchTransactionCleared : boolean;
      IBTReferenceVoucherHeaderId : string;
      ProjectTaskId : boolean;
      CostCenters : CostCenter;
      SubsidiaryAccount : SubsidiaryAccount;
}

export interface PaymentVoucher {

      VoucherTypeId : string;
      Date : string;
      AuthorizedDate : string;
      PayedToReceivedFrom : string;
      PurposeTemplateId : string;
      Description : string;
      Amount : Number;
      ModeOfPaymentId : string;
      ChequeNo : string;
      AccountId : string;
      Project : string;
}

export interface LookupModel {
    Id: string;
    Name: string;
    Code: string;
    text:string;
    value: string
}


