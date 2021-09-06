import { environment } from './../../../../environments/environment';

export const SettingsEndpoints = {
  list: `${environment.urls.api}/api/users`,
  voucherType: `${environment.urls.api}/api/ChartOfAccount/GetVoucherType`,
  listVoucherTypeSetting: `${environment.urls.api}/api/Ifms/GetVoucherTypeSetting`,
  createGeneralSettings: `${environment.urls.api}/api/Ifms/SaveGeneraltSetting`,
  createFixedAssetSettings: `${environment.urls.api}/api/Ifms/SaveFixedAssetSetting`,
  getCostCenter: `${environment.urls.api}/api/Ifms/GetCostCenters`,
  getAccounts: `${environment.urls.api}/api/Ifms/GetAccounts`,
  listAccounts: `${environment.urls.api}/api/Ifms/GetAccountList`,
  listControlAccounts: `${environment.urls.api}/api/Ifms/GetControlAccountList`,
  getVoucherType: `${environment.urls.api}/api/Ifms/GetVoucherTypes`,
  listVoucherType: `${environment.urls.api}/api/Ifms/GetVoucherTypelist`,
  getModePayment: `${environment.urls.api}/api/Ifms/GetModePayment`,
  createVoucherType: `${environment.urls.api}/api/Ifms/SaveVoucherTypeSetting`,

  getCostCodes: `${environment.urls.api}/api/Ifms/GetCostCodes`,
  createCostCode: `${environment.urls.api}/api/Ifms/SaveCostCode`,
  deleteCostCode: `${environment.urls.api}/api/Ifms/DeleteCostCode`,
  deleteVoucherType : `${environment.urls.api}/api/Ifms/DeleteVoucherTypeSetting`,

  getCashier: `${environment.urls.api}/api/Ifms/GetCashiers`,
  createCashier: `${environment.urls.api}/api/Ifms/SaveCashier`,
  deleteCashier: `${environment.urls.api}/api/Ifms/DeleteCashier`,

  listUsers: `${environment.urls.api}/api/Ifms/GetUserList`,

  getLookups: `${environment.urls.api}/api/Lookup/GetLookups`,
};
