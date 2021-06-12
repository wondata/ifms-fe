export interface GeneralSettings {
  incomeSummaryAccount: string;
  closingCapitalAccount: string;
  defaultCostCenter: string;
  interBranchControlAccount: string;
}

export interface FixedAssetSettings {
  defaultCostCenter: string;
  defaultVoucherType: string[];
  gainOnDisposalAccount: string;
  lossOnDisposalAccount: string;
  cashAccount: string;
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

export interface voucherType {}
export interface CostCode {
  ID: string;
  Name: string;
  CostCode: string;
}

export interface Cashier {
  FullName: string;
  email: string;
  phone: string;
  hoursTaken: string;
  hoursRemaining: string;
}
