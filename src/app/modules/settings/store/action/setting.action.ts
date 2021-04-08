import { voucherType } from '../../../../models/defaultSettings';

export class ListVoucherTypes {
  static readonly type = '[SettingsState] ListVoucherType';
  constructor(public readonly payload?: voucherType) {}
}
