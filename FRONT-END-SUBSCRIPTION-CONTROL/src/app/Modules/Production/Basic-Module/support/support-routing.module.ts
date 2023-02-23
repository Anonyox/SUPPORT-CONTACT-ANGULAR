import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support-component/support.component';
import { SupportEndCalledComponent } from './support-end-called-component/support-end-called.component';

import { SupportInCalledComponent } from './support-in-called-component/support-in-called.component';
import { SupportMessagesComponent } from './support-messages-component/support-messages.component';

const routes: Routes = [
  {
    path:"",
    component: SupportComponent
  },
  {
    path:"called",
    component: SupportInCalledComponent
  },
  {
    path:"called/end",
    component: SupportEndCalledComponent
  },
  {
    path:"called/messages/:id",
    component:SupportMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
