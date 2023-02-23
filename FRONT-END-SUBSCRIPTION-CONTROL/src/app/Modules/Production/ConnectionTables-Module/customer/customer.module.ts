import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer-component/customer.component';
import { CustomerCreateComponent } from './customer-create-component/customer-create.component';
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
import { CustomerUpdateComponent } from './customer-update-component/customer-update.component';
import { NgBrazil } from 'ng-brazil';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};










@NgModule({
  declarations: [
    CustomerComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent
  ],
  imports: [
   
    CommonModule,
    CustomerRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    NgxMaskModule.forRoot(maskConfigFunction),

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
    Ng2SearchPipeModule
    

  
    
    
   
  ],
 
  
})
export class CustomerModule { }
