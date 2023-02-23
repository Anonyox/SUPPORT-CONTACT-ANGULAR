import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  //ARRAY DE USUÁRIOS
  employees: any[] = [];

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  formulario: FormGroup;

  //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
  displayedColumns: string[] = ['Nome', 'CPF/CNPJ', 'Cidade', 'Situação Cadastral', 'Acoes'];

  constructor(private title: Title, private service: EmployeeService, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      Search: ['']
    })
  }

  ngOnInit(): void {
    this.title.setTitle("Usuários");
    this.listEmployees();
  }

  //LISTA TODOS OS FUNCIONÁRIOS
  listEmployees() {
    this.service.listEmployees().subscribe(employees => {
      console.log(employees)
      this.employees = employees as []
    })
  }

  //PESQUISA
  filterInDesc(search: string) {
    console.log(search)
    console.log(search.length)
    if (search != null && search.length >= 1) {
      var str = search.replace('/', '');
      this.service.getEmployeeByFilter(str).subscribe(employees => {
        console.log(employees)
        if (employees.length > 0) {

          this.employees = employees
        }
        else {
          this.listEmployees();
        }
      })
    }
    else {
      this.listEmployees();
    }

  }

}