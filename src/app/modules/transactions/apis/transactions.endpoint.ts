import { environment } from './../../../../environments/environment';

export const TransactionsEndpoints = {
  listVoucher: `${environment.urls.api}/api/ChartOfAccount/GetTransactionHeaders`,
  createVoucher: `${environment.urls.api}/api/ChartOfAccount/SaveVoucher`,
  listChartsOfAccount: `${environment.urls.api}/api/ChartOfAccount/GetChartOfAccount`,
  listFinancialTransaction: `${environment.urls.api}/api/Transaction/GetTransactionDetails`,
  listCollectionVoucher: `${environment.urls.api}/api/Voucher/GetCollectionVouchers`,
  listBankReconciliation: `${environment.urls.api}/api/ChartOfAccount/GetBankReconciliation`,
  listPaymentVoucher: `${environment.urls.api}/api/Voucher/GetPaymentVouchers`,
  createPaymentVoucher: `${environment.urls.api}/api/ChartOfAccount/savePaymentVoucher`,
  createCollectionVoucher: `${environment.urls.api}/api/ChartOfAccount/saveCollectionVoucher`,
};
