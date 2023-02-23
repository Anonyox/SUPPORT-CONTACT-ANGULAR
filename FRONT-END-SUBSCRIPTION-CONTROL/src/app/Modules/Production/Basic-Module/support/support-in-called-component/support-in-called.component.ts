import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { DialogSupportDetailComponent } from 'src/shared/Basic-Module/shared/dialog-support-detail/dialog-support-detail.component';
import { CustomerService } from '../../../ConnectionTables-Module/customer/customer.service';
import { EmployeeService } from '../../../ConnectionTables-Module/employee/employee.service';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-in-called',
  templateUrl: './support-in-called.component.html',
  styleUrls: ['./support-in-called.component.css']
})
export class SupportInCalledComponent implements OnInit {

  //ARRAY DE CLIENTES
  customers: any[] = [];

  //ARRAY DE CLIENTES
  employees: any[] = [];

  supports: any[] = [];

  list: any;

  listEmployee: any;

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  customer_Id: string = "";

  employee_Id: string = "";


  formulario: FormGroup;

  displayedColumns: string[] = ['Cliente', 'Title', 'UserResponse', 'callInitSupport', 'update'];




  constructor(
    private formBuilder: FormBuilder,
    private serviceCustomer: CustomerService,
    private serviceEmployee: EmployeeService,
    private title: Title,
    private service: SupportService,
    private dialog: MatDialog) {


    this.formulario = this.formBuilder.group({
      Search: [''],
      customer: [''],
      employee: [''],
    })
  }

  ngOnInit(): void {
    this.listSupports();
    this.listCustomers();
    this.listEmployees();

    this.title.setTitle("Chamados em Atendimento")
  }

  listCustomers() {
    this.serviceCustomer.listCustomers().subscribe(customers => {
      this.customers = customers as [];
    })
  }

  listEmployees() {
    this.serviceEmployee.listEmployees().subscribe(employees => {
      this.employees = employees as [];
    })
  }

  setCustomerFromSearch(id: any) {

    console.log(id)
    this.customer_Id = id
    this.service.listSupportByCustomerInAttendence(id).subscribe(support => {
      this.supports = support as []
    })
  }

  setEmployeeFromSearch(id: any) {

    console.log(id)
    this.employee_Id = id
    this.service.listSupportByEmployeeInAttendence(id).subscribe(support => {
      this.supports = support as []
    })
  }

  openDialog(id:string,title:string,
    customerName:string,
    requestBy:string,
    contacts:string,
    systemPackage:string,
    callEndDate:string,
    insercionDate:string,
    description:string,
    customer_Id:string,
    systemPackage_Id:string,
    status:string
    ) {

    

    const dialogConfig = new MatDialogConfig();

   
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.position = {
      top: '200px',
      left: '800px',
  };


    this.dialog.open(DialogSupportDetailComponent,{
      height: '750px',
      width: '900px',
      data: {
      id:id,
      title:title,
      customer_Id:customer_Id,
      systemPackage_Id:systemPackage_Id,
      customerName:customerName,
      requestBy:requestBy,
      contacts:contacts,
      systemPackage:systemPackage,
      callEndDate:moment(callEndDate).format("DD/MM/YYYY HH:mm:ss"),
      insercionDate:insercionDate,
      description:description,
      status:status
      }
    });

    
}

  //PESQUISA
  filterInDesc(search: string) {
    console.log(search)
    console.log(search.length)
    if (search != null && search.length >= 1) {
      var str = search.replace('/', '');
      console.log(this.customer_Id)
      if (this.customer_Id == "" && this.employee_Id == "") {
        this.service.getSupportByFilterInAttendance(str).subscribe(employees => {
          console.log(employees)
          if (employees.length > 0) {

            this.supports = employees
          }
          else {
           this.supports = []
          }
        })
      }
      else if(this.customer_Id != "" && this.employee_Id == "") {
        this.service.getSupportByFilterCustomerInAttendance(str, this.customer_Id).subscribe(employees => {
          console.log(employees)
          if (employees.length > 0) {

            this.supports = employees
          }
          else {
            this.supports = []
          }
        })
      }

      else if (this.employee_Id != "" && this.customer_Id == "") {
        this.service.getSupportByFilterEmployeeInAttendance(str, this.employee_Id).subscribe(employees => {
          console.log(employees)
          if (employees.length > 0) {

            this.supports = employees
          }
          else {
            this.supports = []
          }
        })
      }

      else if(this.employee_Id != "" && this.customer_Id != "") {
        this.service.listSupportByEmployeeByCustomerInAttendance(str, this.employee_Id,this.customer_Id).subscribe(employees => {
          console.log(employees)
          if (employees.length > 0) {

            this.supports = employees
          }
          else {
            this.supports = []
          }
        })
      }
    }
    else {
      this.listSupports();
      this.customer_Id = "";
      this.employee_Id = "";
      this.list = "";
      this.listEmployee = "";
    }

  }

  listSupports() {
    this.service.listSupportInCalled().subscribe(supports => {
      console.log(supports)
      this.supports = supports as []
    })
  }



}
