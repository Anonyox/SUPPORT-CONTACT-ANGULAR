import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SupportService } from 'src/app/Modules/Production/Basic-Module/support/support.service';
import { EmployeeService } from 'src/app/Modules/Production/ConnectionTables-Module/employee/employee.service';

@Component({
  selector: 'app-dialog-transfering-support-called',
  templateUrl: './dialog-transfering-support-called.component.html',
  styleUrls: ['./dialog-transfering-support-called.component.css']
})
export class DialogTransferingSupportCalledComponent implements OnInit {

  formulario!: FormGroup;
  formulario2!: FormGroup;
  formulario3!: FormGroup;

  status!: string;
  title!: string;


  //ARRAY DE USUÁRIOS
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogTransferingSupportCalledComponent>,
    private router: Router,
    private serviceEmployee: EmployeeService,
    private service: SupportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.title = data.title;
   

    this.formulario2 = this.fb.group({
      id: ['', [<any>Validators.required]],
      title: [''],
      employee: [],
      employeeNameActual:[],
      employee_Id: ['', [<any>Validators.required]],
      support_Id: ['', [<any>Validators.required]],
      insercionDate: ['', [<any>Validators.required]]
    })





  



    this.formulario2.patchValue({
      id:data.id,
      title:data.title,
      employeeNameActual:data.employeeNameActual,
      support_Id: data.support_Id,
      employee_Id: data.employee_Id,
      insercionDate: data.insercionDate
    })


  }

  ngOnInit(): void {

    console.log(this.data)
    this.listEmployees();

  }

  save() {
    this.dialogRef.close(this.formulario.value);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {

    //updateSupportInCalledTransfering

    

    if (this.formulario2.valid) {
      console.log(this.formulario2.value)
      this.service.updateSupportInCalledTransfering(this.formulario2.value).subscribe(supportCalled => {
        this.dialogRef.close();
        this.dialogRef.afterClosed().subscribe(data => {
          this.router.navigate(['support/called'])
        })
      })
    }

  }

  setEmployeeFromSearch(id: any) {

    console.log(id)

    this.formulario2.patchValue({
      employee_Id: id
    })
  }

  listEmployees() {
    this.serviceEmployee.listEmployees().subscribe(employees => {
      this.employees = employees as [];
    })
  }
}
