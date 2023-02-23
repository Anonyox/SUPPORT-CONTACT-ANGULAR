import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee-component/employee.component';
import { EmployeeCreateComponent } from './employee-create-component/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update-component/employee-update.component';

const routes: Routes = [
  {
    path: "",
    component: EmployeeComponent
  },
  {
    path: "create",
    component: EmployeeCreateComponent
  },
  {
    path: "detail/:id",
    component: EmployeeUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
