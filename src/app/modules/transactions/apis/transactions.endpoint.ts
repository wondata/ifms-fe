import { environment } from './../../../../environments/environment';

export const TransactionsEndpoints = {
  listVoucher: `${environment.urls.api}/api/ChartOfAccount/GetTransactionHeaders`,
  createVoucher: `${environment.urls.api}/api/ChartOfAccount/SaveVoucher`,
  listChartsOfAccount: `${environment.urls.api}/api/ChartOfAccount/GetChartOfAccount`,
  listFinancialTransaction: `${environment.urls.api}/api/ChartOfAccount/GetFinantialTransaction`,
  listCollectionVoucher: `${environment.urls.api}/api/ChartOfAccount/GetCollectionVouchers`,
  listBankReconciliation: `${environment.urls.api}/api/ChartOfAccount/GetBankReconciliation`,
};
