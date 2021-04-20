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

export interface voucherType {
  [value: string]: string;
}
