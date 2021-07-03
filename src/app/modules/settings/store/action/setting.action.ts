import {
  FixedAssetSettings,
  GeneralSettings,
  VoucherType,
} from '../../../../models/defaultSettings';

export class ListVoucherTypes {
  static readonly type = '[SettingsState] ListVoucherType';
  constructor(public readonly payload?: VoucherType) {}
}

export class CreateGeneralSettings {
  static readonly type = '[SettingsState] CreateGeneralSettings';
  constructor(public readonly payload?: GeneralSettings) {}
}

export class CreateFixedAssetsSettings {
  static readonly type = '[SettingsState] CreateFixedAssetsSettings';
  constructor(public readonly payload?: FixedAssetSettings) {}
}

export class ListCostCode {
  static readonly type = '[SettingsState] ListCostCode';
  constructor(public readonly payload?: any) {}
}
export class ListVoucherType {
  static readonly type = '[SettingsState] ListVoucherType';
  constructor(public readonly payload?: any) {}
}
export class ListCashier {
  static readonly type = '[SettingsState] ListCashier';
  constructor(public readonly payload?: any) {}
}

export class CreateVoucherType {
  static readonly type = '[SettingsState] CreateVoucherType';
  constructor(public readonly payload?: any) {}
}
