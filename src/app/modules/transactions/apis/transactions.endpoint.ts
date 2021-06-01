import { environment } from './../../../../environments/environment';

export const TransactionsEndpoints = {
  listVoucher: `${environment.urls.api}/api/users`,
  createVoucher: `${environment.urls.api}/api/ChartOfAccount/SaveGeneraltSetting`,
};
