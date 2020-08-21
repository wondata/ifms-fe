import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubsystemComponent } from './subsystem/subsystem.component';
import { OperationComponent } from './operation/operation.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "operation",
    }, {
        path: "subsystem",
        component: SubsystemComponent
    }, {
        path: "operation",
        component: OperationComponent
    }, {
        path: "role",
        component: RoleComponent
    }, {
        path: "user",
        component: UserComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoleRoutingModule {}