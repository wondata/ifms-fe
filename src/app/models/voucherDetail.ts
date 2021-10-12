


export interface VoucherDetail {
  Id : string;
  VoucherHeaderId : string;
  SNo : Number;
  CostCenterId : string;
  CostCenter: string;
  CaseId ?: string;
  CostCodeId ?: string;
  VoucherTypeId: Number;
  ReferenceNo: Number;
  DocumentNo: Number;
  Date: Date;
  PayedToReceivedFrom: string;
  PurposeTemplateId : Number;
  Purpose : string;
  Amount : Number;
  DebitAmount : Number;
  CreditAmount :Number;
  TaxId : Number;
  ChequeNo : string;
  ProjectId ?: string;
  Project ?: string;
  PostedFromOperation : string;
  AuthorizedDate ?: string;
  IsChecked ?: string;

}
