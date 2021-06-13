import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { SettingsApiService } from './apis/settings.api.service';
import { CostCodeComponent } from './components/cost-code/cost-code.component';
import { CostCodePageComponent } from './pages/cost-code/cost-code.component';
import { DefaultSettingComponent } from './pages/default-setting/default-setting.component';
import { VoucherTypeComponent } from './pages/voucher-type/voucher-type.component';
import { SettingsRoutingModule } from './settings.routing';
import { SettingState } from './store/states/setting.state';
import { CashierPageComponent } from './pages/cashier/cashier.component';
@NgModule({
  declarations: [
    DefaultSettingComponent,
    CostCodeComponent,
    CostCodePageComponent,
    VoucherTypeComponent,
    CashierPageComponent,
  ],
  imports: [
    NgxsModule.forFeature([SettingState]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ExtAngularModernModule,
  ],
  exports: [],
  providers: [SettingsApiService],
})
export class SettingsModule {}
