import { environment } from './../../../../environments/environment';

export const TransactionsEndpoints = {
  listVoucher: `${environment.urls.api}/api/ChartOfAccount/listVoucher`,
  createVoucher: `${environment.urls.api}/api/ChartOfAccount/SaveVoucher`,
  listChartsOfAccount: `${environment.urls.api}/api/ChartOfAccount/GetChartOfAccount`,
};
