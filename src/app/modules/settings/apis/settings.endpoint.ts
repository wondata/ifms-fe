import { environment } from './../../../../environments/environment';

export const SettingsEndpoints = {
  list: `${environment.urls.api}/api/users`,
  voucherType: `${environment.urls.api}/api/settings/getVoucherType`,
  createGeneralSettings: `${environment.urls.api}/api/settings/createGeneralSettings`,
  createFixedAssetSettings: `${environment.urls.api}/api/settings/createFixedAssetSettings`,
};
