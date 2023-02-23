import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogRequiredComponent } from './dialog-required/dialog-required.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
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
import { DialogSuccessComponent } from './dialog-success/dialog-success.component';
import { DialogDocumentComponentComponent } from './dialog-document-component/dialog-document-component.component';
import { DialogDocumentExistsComponent } from './dialog-document-exists/dialog-document-exists.component';
import { DialogDocumentCpfComponent } from './dialog-document-cpf/dialog-document-cpf.component';
import { DialogDocumentCpfExistComponent } from './dialog-document-cpf-exist/dialog-document-cpf-exist.component';
import { DialogSuccessUpdateComponent } from './dialog-success-update/dialog-success-update.component';
import { DialogSupportDetailComponent } from './dialog-support-detail/dialog-support-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogTransferingSupportCalledComponent } from './dialog-transfering-support-called/dialog-transfering-support-called.component';
import { DialogCalledSupportEndComponent } from './dialog-called-support-end/dialog-called-support-end.component';


@NgModule({
  declarations: [
    DialogRequiredComponent,
    DialogSuccessComponent,
    DialogDocumentComponentComponent,
    DialogDocumentExistsComponent,
    DialogDocumentCpfComponent,
    DialogDocumentCpfExistComponent,
    DialogSuccessUpdateComponent,
    DialogSupportDetailComponent,
    DialogTransferingSupportCalledComponent,
    DialogCalledSupportEndComponent
  ],

  exports: [
    DialogRequiredComponent,
    DialogSupportDetailComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
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
    MatDialogModule
  ]
})
export class SharedModule { }
