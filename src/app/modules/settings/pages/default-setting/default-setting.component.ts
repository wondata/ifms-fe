declare var Ext: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-setting',
  templateUrl: './default-setting.component.html',
  styleUrls: ['./default-setting.component.scss'],
})
export class DefaultSettingComponent implements OnInit {
  isPhone = Ext.os.is.Phone;
  top = !this.isPhone ? '10' : null;
  left = !this.isPhone ? '10' : null;
  width = !this.isPhone ? '400' : null;
  height = !this.isPhone ? '600' : null;
  ngOnInit(): void {}
}
