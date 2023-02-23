import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Navigation/Basic-Module/navigation/guard/guard.service';
import { HomeComponent } from './Navigation/Basic-Module/navigation/home/home.component';


const routes: Routes = [

  //#region BASIC-MODULE

  {
    path: 'city',
    loadChildren: () =>
      import('./Modules/Production/Basic-Module/city/city.module').then(
        (m) => m.CityModule
      ),canActivate: [AuthGuard],

  },

  {
    path: 'permission',
    loadChildren: () =>
      import('./Modules/Production/Basic-Module/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),canActivate: [AuthGuard],
  },

  {
    path: 'support',
    loadChildren: () =>
      import('./Modules/Production/Basic-Module/support/support.module').then(
        (m) => m.SupportModule
      ),canActivate: [AuthGuard],
  },

  //#endregion

  //#region CONNECTIONTABLES-MODULE
  {
    path: 'customer',
    loadChildren: () =>
      import('./Modules/Production/ConnectionTables-Module/customer/customer.module').then(
        (m) => m.CustomerModule
      ),canActivate: [AuthGuard],

  },

  {
    path: 'employee',
    loadChildren: () =>
      import('./Modules/Production/ConnectionTables-Module/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),canActivate: [AuthGuard],
  },

  {
    path: 'system',
    loadChildren: () =>
      import('./Modules/Production/Basic-Module/system/system.module').then(
        (m) => m.SystemModule
      ),canActivate: [AuthGuard],
  },

  {
    path: 'systemPackage',
    loadChildren: () =>
      import('./Modules/Production/ConnectionTables-Module/system-package/system-package.module').then(
        (m) => m.SystemPackageModule
      ),canActivate: [AuthGuard],
  },

  //#endregion


  {
    path:'',
    loadChildren: () =>
      import('./Modules/Production/Basic-Module/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  
  {
    path: '**',
    redirectTo: "menu",
  },

  {
    path: 'menu',
    loadChildren: () =>
      import('./Navigation/Basic-Module/navigation/navigation.module').then(
        (m) => m.NavigationModule
      ),
    canActivate: [AuthGuard],
  },
































];
//#region MODULE
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//#endregion 
