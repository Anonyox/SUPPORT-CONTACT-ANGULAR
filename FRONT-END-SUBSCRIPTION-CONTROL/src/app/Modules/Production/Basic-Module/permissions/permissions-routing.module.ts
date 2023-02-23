import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsComponent } from './permissions-component/permissions.component';
import { PermissionsCreateComponent } from './permissions-create-component/permissions-create.component';
import { PermissionsUpdateComponent } from './permissions-update-component/permissions-update.component';

const routes: Routes = [
  {
    path: "",
    component: PermissionsComponent
  },
  {
    path: "create",
    component: PermissionsCreateComponent
  },
  {
    path: "detail/:name",
    component: PermissionsUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
