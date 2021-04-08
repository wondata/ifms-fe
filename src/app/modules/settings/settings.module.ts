import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { SettingsApiService } from './apis/settings.api.service';
import { DefaultSettingComponent } from './pages/default-setting/default-setting.component';
import { SettingsRoutingModule } from './settings.routing';
import { SettingState } from './store/states/setting.state';
@NgModule({
  declarations: [DefaultSettingComponent],
  imports: [
    NgxsModule.forFeature([SettingState]),
    ExtAngularModernModule,
    SettingsRoutingModule,
  ],
  exports: [],
  providers: [SettingsApiService],
})
export class SettingsModule {}
