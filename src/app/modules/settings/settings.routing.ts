import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DefaultSettingComponent } from './pages/default-setting/default-setting.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultSettingComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [],
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
