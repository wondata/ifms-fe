import { environment } from './../../../../environments/environment';

export const TransactionsEndpoints = {
  listVoucher: `${environment.urls.api}/api/Voucher/GetAllVoucherList`,
  getVoucherHeaderDetail: `${environment.urls.api}/api/Voucher/GetVoucherHeaderDetails`,
  getVoucherDetail: `${environment.urls.api}/api/Voucher/GetVoucherDetail`,

  listFinancialTransaction: `${environment.urls.api}/api/Transaction/GetTransactionHeaders`,
  createVoucher: `${environment.urls.api}/api/Voucher/SaveVoucher`,
  listChartsOfAccount: `${environment.urls.api}/api/ChartOfAccount/GetChartOfAccount`,
  listCollectionVoucher: `${environment.urls.api}/api/Voucher/GetCollectionVouchers`,
  listBankReconciliation: `${environment.urls.api}/api/ChartOfAccount/GetBankReconciliation`,
  listPaymentVoucher: `${environment.urls.api}/api/Voucher/GetPaymentVouchers`,
  createPaymentVoucher: `${environment.urls.api}/api/ChartOfAccount/savePaymentVoucher`,
  createCollectionVoucher: `${environment.urls.api}/api/ChartOfAccount/saveCollectionVoucher`,
};
