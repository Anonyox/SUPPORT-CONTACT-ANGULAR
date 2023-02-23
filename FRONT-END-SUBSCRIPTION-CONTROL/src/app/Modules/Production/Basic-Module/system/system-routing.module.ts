import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system-component/system.component';
import { SystemCreateComponent } from './system-create-component/system-create.component';
import { SystemUpdateComponent } from './system-update-component/system-update.component';

const routes: Routes = [
  {
    path: "",
    component: SystemComponent
  },
  {
    path: "create",
    component: SystemCreateComponent
  },
  {
    path: "detail/:id",
    component: SystemUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
