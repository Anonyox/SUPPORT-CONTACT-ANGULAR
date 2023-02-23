import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support-component/support.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SupportInCalledComponent } from './support-in-called-component/support-in-called.component';
import { SupportMessagesComponent } from './support-messages-component/support-messages.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SupportEndCalledComponent } from './support-end-called-component/support-end-called.component';






@NgModule({
  declarations: [
    SupportComponent,
    SupportInCalledComponent,
    SupportMessagesComponent,
    SupportEndCalledComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,

    FormsModule,
    ReactiveFormsModule,

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
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ]
})
export class SupportModule { }
