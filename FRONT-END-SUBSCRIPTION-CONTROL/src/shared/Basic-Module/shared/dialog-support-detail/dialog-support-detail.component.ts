import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SupportService } from 'src/app/Modules/Production/Basic-Module/support/support.service';

@Component({
  selector: 'app-dialog-support-detail',
  templateUrl: './dialog-support-detail.component.html',
  styleUrls: ['./dialog-support-detail.component.css']
})
export class DialogSupportDetailComponent implements OnInit {

  formulario!: FormGroup;
  formulario2!: FormGroup;
  formulario3!: FormGroup;

  status!: string;
  title!: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogSupportDetailComponent>,
    private router: Router,
    private service: SupportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.title = data.title;
    this.formulario = this.fb.group({
      id: ['', <any>Validators.required],
      title: ['', <any>Validators.required],
      customerName: [''],
      requestBy: ['', <any>Validators.required],
      contacts: ['', <any>Validators.required],
      systemPackage: [''],
      callEndDate: [''],
      insercionDateFormat: [''],
      insercionDate: ['', <any>Validators.required],
      description: [''],
      customer_Id: [''],
      status: [''],
      systemPackage_Id: ['']
    });

    this.formulario2 = this.fb.group({
      employee_Id: ['', <any>Validators.required],
      support_Id: ['', <any>Validators.required],
    });

    this.formulario3 = this.fb.group({
      supportCalled_Id: ['', [<any>Validators.required]],
      emitName: ['', [<any>Validators.required]],
      description: ['', [<any>Validators.required]],
      typeEmit: ['Client', [<any>Validators.required]],
    })


    this.formulario.patchValue({
      id: data.id,
      title: data.title,
      customerName: data.customerName,
      requestBy: data.requestBy,
      contacts: data.contacts,
      systemPackage: data.systemPackage,
      callEndDate: data.callEndDate,
      insercionDateFormat: moment(data.insercionDate).format("DD/MM/YYYY HH:mm:ss"),
      description: data.description,
      insercionDate: data.insercionDate,
      customer_Id: data.customer_Id,
      systemPackage_Id: data.systemPackage_Id,
      status: data.status
    })

    this.status =  data.status;



    this.formulario2.patchValue({
      support_Id: data.id,
      employee_Id: localStorage.getItem('employee_Id')?.toString()
    })


  }

  ngOnInit(): void {

    console.log(this.data)


  }

  save() {
    this.dialogRef.close(this.formulario.value);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.formulario.value)
    let dt = new Date('0000-00-00 : 00:00:00');
    this.formulario.patchValue({
      status: "Em Atendimento",
      callEndDate: dt
    })

    if (this.formulario.valid) {

      console.log(this.formulario2.value)
      this.service.createSupportCalled(this.formulario2.value).subscribe(supportCalled => {
        this.formulario3.patchValue({
          supportCalled_Id: supportCalled.id,
          emitName: this.formulario.value.requestBy,
          description: this.formulario.value.description
        })
        this.service.supportUpdate(this.formulario.value).subscribe(support => {
          this.service.createSupportCalledMessage(this.formulario3.value).subscribe(calledMessages => {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(data => {
              this.router.navigate(['support/called'])
            })
          })

        })

      })




    }


  }

}
