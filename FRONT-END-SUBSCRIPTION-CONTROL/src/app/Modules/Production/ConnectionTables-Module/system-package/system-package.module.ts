import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemPackageRoutingModule } from './system-package-routing.module';
import { SystemPackageComponent } from './system-package/system-package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SysTemPackageCreateComponent } from './sys-tem-package-create/system-package-create.component';
import { SysTemPackageUpdateComponent } from './sys-tem-package-update/system-package-update.component';


@NgModule({
  declarations: [
    SystemPackageComponent,
    SysTemPackageCreateComponent,
    SysTemPackageUpdateComponent
  ],
  imports: [
    CommonModule,
    SystemPackageRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,

   
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class SystemPackageModule { }
