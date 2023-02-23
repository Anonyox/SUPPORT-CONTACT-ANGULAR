import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  //ARRAY DE CLIENTES
  customers: any[] = [];

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  formulario: FormGroup;

  //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
  displayedColumns: string[] = ['Nome', 'CPF/CNPJ', 'Cidade', 'Situação Cadastral', 'Acoes'];

  constructor(private title: Title, private service: CustomerService, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      Search: ['']
    })
  }

  ngOnInit(): void {
    this.title.setTitle("Clientes")

    this.listCustomers();
  }

  //LISTA TODOS OS CLIENTES
  listCustomers() {
    this.service.listCustomers().subscribe(customers => {
      this.customers = customers as [];
    })
  }

   //PESQUISA
   filterInDesc(search: string) {
    console.log(search)
    console.log(search.length)
    if (search != null && search.length >= 1) {
      var str = search.replace('/', '');
      this.service.getCustomerByFilter(str).subscribe(customers => {
        console.log(customers)
        if (customers.length > 0) {

          this.customers = customers
        }
        else {
          this.listCustomers();
        }
      })
    }
    else {
      this.listCustomers();
    }

  }

}