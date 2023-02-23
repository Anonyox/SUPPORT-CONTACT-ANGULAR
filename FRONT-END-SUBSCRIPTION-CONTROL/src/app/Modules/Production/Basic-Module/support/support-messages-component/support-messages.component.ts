import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SidebarComponent } from 'src/app/Navigation/Basic-Module/navigation/sidebar/sidebar.component';
import { SupportService } from '../support.service';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core'
import { DialogTransferingSupportCalledComponent } from 'src/shared/Basic-Module/shared/dialog-transfering-support-called/dialog-transfering-support-called.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCalledSupportEndComponent } from 'src/shared/Basic-Module/shared/dialog-called-support-end/dialog-called-support-end.component';

@Component({
  selector: 'app-support-messages',
  templateUrl: './support-messages.component.html',
  styleUrls: ['./support-messages.component.css']
})
export class SupportMessagesComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;


  employee_Name: any = "";
  employee_NameAttendance: any = "";
  employee_Id: any = "";
  employee_Id_Logged: any = "";
  supportCalled_Id: string = "";
  enableTextSend: boolean = false;

  customer_Name: string = "";
  customer_Requisition: string = "";
  initSupport: string = "";
  isLoading: any = true;

  callMessages: any = [];
  pingError:any;

  formulario!: FormGroup;

  formulario2!: FormGroup;

  onButtons: boolean = false;

  dateFinishedCall: string = "";



  constructor(
    private componentSupportSideBar: SidebarComponent,
    private dialog: MatDialog,
    private router: Router,
    private service: SupportService,
    private title: Title,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) {



    this.employee_Name = localStorage.getItem("employee_Name")?.toString();



      this.formulario = this.formBuilder.group({
        supportCalled_Id: ['', [<any>Validators.required]],
        emitName: [this.employee_Name, [<any>Validators.required]],
        description: ['', [<any>Validators.required]],
        typeEmit: ['Support', [<any>Validators.required]],


      })

      this.formulario2 = this.formBuilder.group({
        id: ['', [<any>Validators.required]],
        title: [''],
        employee_Id: ['', [<any>Validators.required]],
        employeeNameActual: [],
        support_Id: ['', [<any>Validators.required]],
        insercionDate: ['', [<any>Validators.required]],

        //SUPPORT
        idSupport: ['',<any>Validators.required],
        titleSupport: ['',<any>Validators.required],
        requestBySupport: ['',<any>Validators.required],
        customer_IdSupport: ['',<any>Validators.required],
        systemPackage_IdSupport: ['',<any>Validators.required],
        descriptionSupport: ['',<any>Validators.required],
        statusSupport: ['',<any>Validators.required],
        contactsSupport: ['',<any>Validators.required],
        callEndDateSupport: ['',<any>Validators.required],
        insercionDateSupport: ['',<any>Validators.required],
      })



  }

  ngOnInit(): void {
    this.title.setTitle("Atendimento")

    this.employee_Id_Logged = localStorage.getItem('employee_Id')?.toString();

    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }



    const { params } = this.activatedRoute;

    params.subscribe(data => {
      this.supportCalled_Id = data['id'];

      this.pingResponse();
    })
  }

  listMessagesFromSupportCalled(id: string) {
    this.service.listSupportCalledMessagesFromId(id).subscribe(supportCalledMessages => {
      console.log(supportCalledMessages)
      if (supportCalledMessages[0].supportCalled.support.status == "Finalizado") {
        this.onButtons = false

        this.dateFinishedCall = supportCalledMessages[0].supportCalled.support.supportCalledEnd[0].insercionDate
      }
      else {

        this.onButtons = true
      }

      this.formulario2.patchValue({
        id: supportCalledMessages[0].supportCalled.id,
        title: supportCalledMessages[0].supportCalled.support.title,
        employeeNameActual: supportCalledMessages[0].supportCalled.employee.person.name,
        employee_Id: supportCalledMessages[0].supportCalled.employee.id,
        support_Id: supportCalledMessages[0].supportCalled.support.id,
        insercionDate: supportCalledMessages[0].supportCalled.insercionDate,

         //SUPPORT
       idSupport: supportCalledMessages[0].supportCalled.support.id,
       titleSupport: supportCalledMessages[0].supportCalled.support.title,
       requestBySupport: supportCalledMessages[0].supportCalled.support.requestBy,
       customer_IdSupport: supportCalledMessages[0].supportCalled.support.customer.id,
       systemPackage_IdSupport: supportCalledMessages[0].supportCalled.support.systemPackage_Id,
       descriptionSupport: supportCalledMessages[0].supportCalled.support.description,
       statusSupport: supportCalledMessages[0].supportCalled.support.status,
       contactsSupport: supportCalledMessages[0].supportCalled.support.contacts,
       callEndDateSupport: supportCalledMessages[0].supportCalled.support.callEndDate,
       insercionDateSupport: supportCalledMessages[0].supportCalled.support.insercionDate,
      })

      console.log(this.formulario2.value)

      this.customer_Name = supportCalledMessages[0].supportCalled.support.customer.person.name;
      this.customer_Requisition = supportCalledMessages[0].supportCalled.support.requestBy;
      this.employee_NameAttendance = supportCalledMessages[0].supportCalled.employee.person.name;
      this.employee_Id = supportCalledMessages[0].supportCalled.employee.id;
      this.initSupport = supportCalledMessages[0].supportCalled.insercionDate;


      console.log(this.callMessages.lenght)
      if (this.callMessages.length < supportCalledMessages.length) {
        let audio = new Audio();
        audio.src = "/assets/UntitledReceived.wav";
        audio.load();
        audio.play();
      }

      this.callMessages = supportCalledMessages as []

      console.log(supportCalledMessages)

      if (this.employee_Id == this.employee_Id_Logged) {
        this.enableTextSend = true;
        console.log(this.employee_Id)
        console.log(this.employee_Id_Logged)
      }
      else {
        this.enableTextSend = false;
      }
    }, err => {
      if(err.status == 401) {
        this.pingError = true;
      }
    })
  }

  navigateFromSupportStatus() {
    if (this.dateFinishedCall != "") {
      this.router.navigate(['support/called/end'])
    }
    else {
      this.router.navigate(['support/called'])
    }
  }

  sendMessage() {




    this.formulario.patchValue({
      supportCalled_Id: this.supportCalled_Id,
      //insercionDate: moment(new Date).format('DD/MM/yyyy hh:mm:ss'),

    })

    console.log(moment(new Date()).format('yyyy-MM-DD hh:mm:ss.ms'))

    if (this.formulario.valid) {
      this.service.createSupportCalledMessage(this.formulario.value).subscribe(message => {
        let audio = new Audio();
        audio.src = "/assets/UntitledSend.wav";
        audio.load();
        audio.play();

        this.service.listSupportCalledMessagesFromId(this.supportCalled_Id).subscribe(supportCalledMessages => {
          this.callMessages = supportCalledMessages as []

          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;


        })

        this.formulario.patchValue({
          description: ""
        })



      })
    }

    console.log(this.formulario.value)

  }

  openDialog(
  ) {



    const dialogConfig = new MatDialogConfig();


    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.position = {
      top: '200px',
      left: '800px',
    };


    this.dialog.open(DialogTransferingSupportCalledComponent, {
      height: '300px',
      width: '900px',
      data: {
        id: this.formulario2.value.id,
        title: this.formulario2.value.title,
        employeeNameActual: this.formulario2.value.employeeNameActual,
        employee_Id: this.formulario2.value.employee_Id,
        support_Id: this.formulario2.value.support_Id,
        insercionDate: this.formulario2.value.insercionDate
      }
    });




  }

  openDialogFinished(
  ) {

    const dialogConfig = new MatDialogConfig();


    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.position = {
      top: '200px',
      left: '800px',
    };


    this.dialog.open(DialogCalledSupportEndComponent, {
      height: '350px',
      width: '900px',
      data: {
        id: this.formulario2.value.id,
        title: this.formulario2.value.title,
        employeeNameActual: this.formulario2.value.employeeNameActual,
        employee_Id: this.formulario2.value.employee_Id,
        support_Id: this.formulario2.value.support_Id,
        insercionDate: this.formulario2.value.insercionDate,

        //SUPPORT
        idSupport: this.formulario2.value.idSupport,
        titleSupport: this.formulario2.value.titleSupport,
        requestBySupport: this.formulario2.value.requestBySupport,
        customer_IdSupport: this.formulario2.value.customer_IdSupport,
        systemPackage_IdSupport: this.formulario2.value.systemPackage_IdSupport,
        descriptionSupport: this.formulario2.value.descriptionSupport,
        statusSupport: this.formulario2.value.statusSupport,
        contactsSupport: this.formulario2.value.contactsSupport,
        callEndDateSupport: this.formulario2.value.callEndDateSupport,
        insercionDateSupport: this.formulario2.value.insercionDateSupport


      }
    });
  }


  pingResponse() {

    if (this.pingError != true) {

    this.listMessagesFromSupportCalled(this.supportCalled_Id);
   
    this.pingTimeout();
    }











  }

  pingTimeout() {

    var dt = new Date();



    var that = this;


    setTimeout(function () {



      that.pingResponse();


    }, 2000);


  }
}
