import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysTemPackageCreateComponent } from './sys-tem-package-create/system-package-create.component';
import { SysTemPackageUpdateComponent } from './sys-tem-package-update/system-package-update.component';
import { SystemPackageComponent } from './system-package/system-package.component';

const routes: Routes = [

  {
    path: ":id/:name",
    component: SystemPackageComponent
  },
  {
    path: "create/:id/:name",
    component: SysTemPackageCreateComponent
  },
  {
    path: "detail/update/:id",
    component: SysTemPackageUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemPackageRoutingModule { }
