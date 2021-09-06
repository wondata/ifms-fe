import { environment } from './../../../../environments/environment';

export const TransactionsEndpoints = {
  listVoucher: `${environment.urls.api}/api/Voucher/GetAllVoucherList`,
  getVoucherHeaderDetail: `${environment.urls.api}/api/Voucher/GetVoucherHeaderDetails`,
  getVoucherDetail: `${environment.urls.api}/api/Voucher/GetVoucherDetail`,
  createVoucher: `${environment.urls.api}/api/Voucher/SaveVoucher`,
  listCollectionVoucher: `${environment.urls.api}/api/Voucher/GetCollectionVouchers`,
  listPaymentVoucher: `${environment.urls.api}/api/Voucher/GetPaymentVouchers`,
  createPaymentVoucher: `${environment.urls.api}/api/Voucher/savePaymentVoucher`,
  createCollectionVoucher: `${environment.urls.api}/api/Voucher/saveCollectionVoucher`,
  deletePaymentVoucher: `${environment.urls.api}/api/Voucher/DeletePaymentVoucher`,
  deleteCollectionVoucher: `${environment.urls.api}/api/Voucher/DeleteCollectionVoucher`,
  getVoucherNumber: `${environment.urls.api}/api/Voucher/GetVoucherNumber`,
  getDefaultAccount: `${environment.urls.api}/api/Voucher/GetDefaultAccounts`,
  saveVoucher: `${environment.urls.api}/api/Voucher/SaveVoucher`,
  deleteVoucherDetail : `${environment.urls.api}/api/Voucher/DeleteVoucherDetail`,

  getPaymentVoucherTypes: `${environment.urls.api}/api/Ifms/GetPaymentVoucherTypes`,
  getCollectionVoucherTypes: `${environment.urls.api}/api/Ifms/GetCollectionVoucherTypes`,
  getVoucherType: `${environment.urls.api}/api/Ifms/GetVoucherTypes`,
  getModePayment: `${environment.urls.api}/api/Ifms/GetModePayment`,
  getCostCenter: `${environment.urls.api}/api/Ifms/GetCostCenters`,
  listPurposeTemplates: `${environment.urls.api}/api/Ifms/GetAllPurposeTemplates`,
  listAccounts: `${environment.urls.api}/api/Ifms/GetAccountList`,

  listFinancialTransaction: `${environment.urls.api}/api/Transaction/GetTransactionHeaders`,
  getTransactionDetail : `${environment.urls.api}/api/Transaction/GetTransactionDetails`,

  listChartsOfAccount: `${environment.urls.api}/api/ChartOfAccount/GetChartOfAccount`,
  listBankReconciliation: `${environment.urls.api}/api/ChartOfAccount/GetBankReconciliation`,

  postTranasaction: `${environment.urls.api}/api/Transaction/TransactionPost`,
  unpostTranasaction: `${environment.urls.api}/api/Transaction/TransactionUnpost`,
  voidTranasaction: `${environment.urls.api}/api/Transaction/TransactionVoid`,
  deleteTranasaction: `${environment.urls.api}/api/Transaction/TransactionDelete`,
  adjustTranasaction: `${environment.urls.api}/api/Transaction/TransactionAdjust`,
  getJvNumber: `${environment.urls.api}/api/Transaction/GetJvNumber`,

  getLookups: `${environment.urls.api}/api/Lookup/GetLookups`,
};
