import { environment } from './../../../../environments/environment';

export const SettingsEndpoints = {
  list: `${environment.urls.api}/api/users`,
  voucherType: `${environment.urls.api}/api/ChartOfAccount/getVoucherType`,
  createGeneralSettings: `${environment.urls.api}/api/Ifms/SaveGeneraltSetting`,
  createFixedAssetSettings: `${environment.urls.api}/api/Ifms/SaveFixedAssetSetting`,
  getCostCodes: `${environment.urls.api}/api/ChartOfAccount/GetCostCodes`,
  getVoucherType: `${environment.urls.api}/api/Ifms/GetVoucherType`,
  getCashier: `${environment.urls.api}/api/ChartOfAccount/GetCashiers`,
  createVoucherType: `${environment.urls.api}/api/Ifms/SaveVoucherTypesSetting`,
};
