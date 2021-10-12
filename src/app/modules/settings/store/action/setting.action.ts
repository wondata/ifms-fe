import {
  Cashier, CostCode, FixedAssetSettings,
  GeneralSettings,
  VoucherType,
  VoucherTypeSetting
} from '../../../../models/defaultSettings';


export class ListVoucherType {
  static readonly type = '[SettingsState] ListVoucherType';
  constructor(public readonly payload?: any) {}
}

export class GetLookups {
  static readonly type = '[SettingsState] GetLookups';
  constructor(public readonly payload?: any) {}
}

export class DataVoucherType {
  static readonly type = '[SettingsState] DataVoucherType';
  constructor(public readonly payload?: any) {}
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

export class ListCostCenter {
  static readonly type = '[SettingsState] ListCostCenter';
  constructor(public readonly payload?: any) {}
}


export class ListAccounts {
  static readonly type = '[SettingsState] ListAccounts';
  constructor(public payload?: any) {}
}

export class ListUsers {
  static readonly type = '[SettingsState] ListUsers';
  constructor(public payload?: any) {}
}

export class ListControlAccounts {
  static readonly type = '[SettingsState] ListControlAccounts';
  constructor(public payload?: any) {}
}

export class GetAccounts {
  static readonly type = '[SettingsState] GetAccounts';
  constructor(public payload: any) {}
}


export class ListVoucherTypeSetting {
  static readonly type = '[SettingsState] ListVoucherTypeSetting';
  constructor(public readonly payload?: any) {}
}


export class ListCashier {
  static readonly type = '[SettingsState] ListCashier';
  constructor(public readonly payload?: any) {}
}

export class CreateVoucherType {
  static readonly type = '[SettingsState] CreateVoucherType';
  constructor(public readonly payload?: VoucherTypeSetting) {}
}

export class CreateCostCode {
  static readonly type = '[SettingsState] CreateCostCode';
  constructor(public readonly payload?: CostCode) {}
}

export class DeleteCostCode {
  static readonly type = '[SettingsState] DeleteCostCode';
  constructor(public readonly payload?: CostCode) {}
}

export class CreateCashier {
  static readonly type = '[SettingsState] CreateCashier';
  constructor(public readonly payload?: Cashier) {}
}

export class DeleteCashier {
  static readonly type = '[SettingsState] DeleteCashier';
  constructor(public readonly payload?: Cashier) {}
}

export class DeleteVoucherType {
  static readonly type = '[SettingsState] DeleteVoucherType';
  constructor(public readonly payload?: VoucherType) {}
}




