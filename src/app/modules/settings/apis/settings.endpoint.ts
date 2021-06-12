import { environment } from './../../../../environments/environment';

export const SettingsEndpoints = {
  list: `${environment.urls.api}/api/users`,
  voucherType: `${environment.urls.api}/api/ChartOfAccount/getVoucherType`,
  createGeneralSettings: `${environment.urls.api}/api/ChartOfAccount/SaveGeneraltSetting`,
  createFixedAssetSettings: `${environment.urls.api}/api/ChartOfAccount/SaveFixedAssetSetting`,
  getCostCodes: `${environment.urls.api}/api/ChartOfAccount/GetCostCodes`,
  getVoucherType: `${environment.urls.api}/api/ChartOfAccount/GetVoucherTypeSetting`,
  getCashier: `${environment.urls.api}/api/ChartOfAccount/GetCashiers`,
};
