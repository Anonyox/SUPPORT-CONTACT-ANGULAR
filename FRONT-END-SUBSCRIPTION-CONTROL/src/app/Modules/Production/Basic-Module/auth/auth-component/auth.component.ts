import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';
import { EmployeeService } from '../../../ConnectionTables-Module/employee/employee.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  formAuth: FormGroup;
  logout: any;



  constructor(
    private FormAuth: FormBuilder,
    private service: EmployeeService,
    private reqS: RequisitionService,
    private route: Router,
    private title: Title,
    private pingService: RequisitionService) {

    this.formAuth = this.FormAuth.group({
      username: [null],
      password: [null]
    })
  }

  ngOnInit(): void {

    localStorage.removeItem('token');


    this.title.setTitle("Acesso ao Sistema")


  }


  auth() {
    console.log(this.formAuth.value)
    this.service.auth(this.formAuth.value).subscribe(x => {
      console.log(x)
      console.log(x.employee_Username)
      localStorage.setItem('token', x.accessToken)
      localStorage.setItem('employee_Name', x.employee_Name)
      localStorage.setItem('employee_Username', x.employee_Username)
      localStorage.setItem('employee_Id', x.employee_Id)
      localStorage.setItem('permission_Id', x.permissions.id)

      if (localStorage.getItem('token') != null) {

        this.route.navigate(['home'])
        //this.reqS.ping();
      }
      else
        this.route.navigate(['/login'])

    }, err => {

      if (err.status == 0) {
        alert("NÃO FOI POSSÍVEL SE CONECTAR COM O SERVIDOR")
      }
      else {
        alert("USUÁRIO OU SENHA INCORRETOS")
      }
      console.log(err.error)
      this.route.navigate([''])
    });


  }

  usuarioAutenticado() {
    if (localStorage.getItem("token") != null) {
      return true;
    } else {
      return false;
    }
  }

  //#region Alerts
  // handleError(msg: string) {
  //   this.alert.showAlertDanger(msg)
  // }

  // getEmployee() {
  //   this.service.getByNameEmployee
  // }

  // handlePrimary(msg: string) {
  //   this.alert.showAlertPrimary(msg)
  // }

  //#endregion

}
