import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer-component/customer.component';
import { CustomerCreateComponent } from './customer-create-component/customer-create.component';
import { CustomerUpdateComponent } from './customer-update-component/customer-update.component';

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent
  },
  {
    path: "create",
    component: CustomerCreateComponent
  },
  {
    path: "detail/:id",
    component: CustomerUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
