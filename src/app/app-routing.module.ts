import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { from } from 'rxjs';

const routes: Routes = [{
    path: "",
    redirectTo: "user-role",
    pathMatch: "full",
  }, {
    path: "dashboard",
    component: LayoutDefaultComponent,
    children: [{
      path: '',
      component: DashboardComponent
    }]
  }, {
    path: 'user-role',
    component: LayoutDefaultComponent,
    loadChildren: () =>
      import('./modules/user-role/user-role.module').then(
        (m) => m.UserRoleModule
      ),
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
