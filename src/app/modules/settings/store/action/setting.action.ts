import {
  FixedAssetSettings,
  GeneralSettings,
  voucherType,
} from '../../../../models/defaultSettings';

export class ListVoucherTypes {
  static readonly type = '[SettingsState] ListVoucherType';
  constructor(public readonly payload?: voucherType) {}
}

export class CreateGeneralSettings {
  static readonly type = '[SettingsState] CreateGeneralSettings';
  constructor(public readonly payload?: GeneralSettings) {}
}

export class CreateFixedAssetsSettings {
  static readonly type = '[SettingsState] CreateFixedAssetsSettings';
  constructor(public readonly payload?: FixedAssetSettings) {}
}
