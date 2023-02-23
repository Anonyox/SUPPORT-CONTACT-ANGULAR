import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../../../ConnectionTables-Module/customer/customer.service';
import { SupportService } from '../support.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogSupportDetailComponent } from 'src/shared/Basic-Module/shared/dialog-support-detail/dialog-support-detail.component';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';





@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  //ARRAY DE CLIENTES
  customers: any[] = [];

  supports: any[] = [];

  list:any;

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  customer_Id: string = "";


  formulario: FormGroup;

  displayedColumns: string[] = ['Cliente', 'Title', 'InsercionDate', 'update'];

 


  constructor(private formBuilder: FormBuilder, private title:Title, private serviceCustomer: CustomerService, private service: SupportService, private dialog: MatDialog) {

    
    this.formulario = this.formBuilder.group({
      Search: [''],
      customer: ['']
    })
  }

  ngOnInit(): void {
    this.listSupports();
    this.listCustomers();
    this.title.setTitle("Chamados Abertos")
  }

  listCustomers() {
    this.serviceCustomer.listCustomers().subscribe(customers => {
      this.customers = customers as [];
    })
  }

  setCustomerFromSearch(id: any) {
    
    console.log(id)
    this.customer_Id = id
    this.service.listSupportByCustomer(id).subscribe(support => {
      this.supports = support as []
    })
  }

  //PESQUISA
  filterInDesc(search: string) {
    console.log(search)
    console.log(search.length)
    if (search != null && search.length >= 1) {
      var str = search.replace('/', '');
      console.log(this.customer_Id)
      if (this.customer_Id == "") {
        this.service.getSupportByFilter(str).subscribe(employees => {
          console.log(employees)
          if (employees.length > 0) {

            this.supports = employees
          }
          else {
            this.filterInDesc(this.search);
          }
        })
      }
      else {
        this.service.getSupportByFilterCustomer(str,this.customer_Id).subscribe(employees => {
          console.log(employees)
          if (employees.length > 0) {

            this.supports = employees
          }
          else {
            this.filterInDesc(this.search);
          }
        })
      }
    }
    else {
        this.listSupports();
        this.customer_Id = "";
        this.list = "";
    }

  }

  listSupports() {
    this.service.listSupport().subscribe(supports => {
      this.supports = supports as []
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
      callEndDate:moment(callEndDate).format("DD/MM/YYYY hh:mm:ss"),
      insercionDate:insercionDate,
      description:description,
      status:status
      }
    });

    
}

}
