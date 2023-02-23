import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SupportService } from 'src/app/Modules/Production/Basic-Module/support/support.service';
import { EmployeeService } from 'src/app/Modules/Production/ConnectionTables-Module/employee/employee.service';

@Component({
  selector: 'app-dialog-called-support-end',
  templateUrl: './dialog-called-support-end.component.html',
  styleUrls: ['./dialog-called-support-end.component.css']
})
export class DialogCalledSupportEndComponent implements OnInit {

  formulario!: FormGroup;
  formulario2!: FormGroup;
  formulario3!: FormGroup;
  formulario4!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogCalledSupportEndComponent>,
    private router: Router,
    private serviceEmployee: EmployeeService,
    private service: SupportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formulario = this.fb.group({
      employeeNameActual: [],
      endSupportCalledDescription: ['', [<any>Validators.required]],
      totalServiceTime: ['', [<any>Validators.required]],
      support_Id: ['', [<any>Validators.required]],
      employee_Id: ['', [<any>Validators.required]],

    })

    this.formulario2 = this.fb.group({
      id: ['', [<any>Validators.required]],
      title: [''],
      employee: [],
      employeeNameActual: [],
      descripionEnd: [],
      employee_Id: ['', [<any>Validators.required]],
      support_Id: ['', [<any>Validators.required]],
      insercionDate: ['', [<any>Validators.required]]
    })

    this.formulario3 = this.fb.group({

      //SUPPORT
      id: ['', <any>Validators.required],
      title: ['', <any>Validators.required],
      requestBy: ['', <any>Validators.required],
      customer_Id: ['', <any>Validators.required],
      systemPackage_Id: ['', <any>Validators.required],
      description: ['', <any>Validators.required],
      status: ['', <any>Validators.required],
      contacts: ['', <any>Validators.required],
      callEndDate: ['', <any>Validators.required],
      insercionDate: ['', <any>Validators.required],
    })

    this.formulario4 = this.fb.group({
      supportCalled_Id: ['', [<any>Validators.required]],
      emitName: ['', [<any>Validators.required]],
      description: ['', [<any>Validators.required]],
      typeEmit: ['Support', [<any>Validators.required]],
    })

    console.log(data)

    this.formulario.patchValue({
      employee_Id: data.employee_Id,
      employeeNameActual: data.employeeNameActual,
      support_Id: data.support_Id
    })

    this.formulario2.patchValue({
      id: data.id,
      title: data.title,
      employeeNameActual: data.employeeNameActual,
      support_Id: data.support_Id,
      employee_Id: data.employee_Id,
      insercionDate: data.insercionDate
    })

    this.formulario3.patchValue({
      //SUPPORT
      id: data.idSupport,
      title: data.titleSupport,
      requestBy: data.requestBySupport,
      customer_Id: data.customer_IdSupport,
      systemPackage_Id: data.systemPackage_IdSupport,
      description: data.descriptionSupport,
      status: "Finalizado",
      contacts: data.contactsSupport,
      callEndDate: data.callEndDateSupport,
      insercionDate: data.insercionDateSupport
    })

    this.formulario4.patchValue({
      supportCalled_Id: data.id,
      emitName: data.employeeNameActual,
    })

  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.formulario.value)
    if (this.formulario.valid) {
      this.service.createSupportEndCalled(this.formulario.value).subscribe(supportEndCalled => {
        this.service.supportUpdate(this.formulario3.value).subscribe(support => {
          this.formulario4.patchValue({
            description: this.formulario.value.endSupportCalledDescription + " | FINALIZADO"
          })
          this.service.createSupportCalledMessage(this.formulario4.value).subscribe(calledMessages => {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(data => {
              this.router.navigate(['support/called/end'])
            })
          })

        })

      })

    }
  }

  close() {
    this.dialogRef.close();
  }

}
