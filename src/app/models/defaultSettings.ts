export interface GeneralSettings {
  incomeSummaryAsc: string;
  closingCapitalAsc: string;
  defaultCostCenter: string;
  interBranchControlAsc: string;
}

export interface FixedAssetSettings {
  defaultCostCenter: string;
  defaultVoucherType: string[];
  gainOnDisposalAsc: string;
  lossOnDisposalAsc: string;
  cashAsc: string;
}

export interface voucherType {
  [value: string]: string;
}
