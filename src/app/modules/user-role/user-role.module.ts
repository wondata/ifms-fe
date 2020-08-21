import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsystemComponent } from './subsystem/subsystem.component';
import { UserRoleRoutingModule } from './user-role-routing.module'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { FlexLayoutModule } from '@angular/flex-layout';
import { OperationComponent } from './operation/operation.component'
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [SubsystemComponent, OperationComponent, RoleComponent, UserComponent],
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class UserRoleModule { }
