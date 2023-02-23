import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SystemPackageService } from '../system-package.service';

@Component({
  selector: 'app-system-package',
  templateUrl: './system-package.component.html',
  styleUrls: ['./system-package.component.css']
})
export class SystemPackageComponent implements OnInit {

  //ARRAY DE SISTEMAS
  systemPackage: any[] = [];

  //NOME PESSOA
  name: string = '';

  //ID CLIENTE
  id: string = '';

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  formulario: FormGroup;

  //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
  displayedColumns: string[] = ['Title', 'Description', 'Status', 'Acoes'];

  constructor(private service: SystemPackageService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      Search: ['']
    })
   }

  ngOnInit(): void {


    const { params } = this.activatedRoute;

    params.subscribe(data => {
      this.id = data['id']
      this.name = data['name']

      this.listSystemPackageByCustomer(data['id']);
    })
  }


  //PESQUISA
  filterInDesc(search: string) {
    console.log(search)
    console.log(search.length)
    if (search != null && search.length >= 1) {
      var str = search.replace('/', '');
      this.service.getSystemPackageByFilter(this.id,str).subscribe(systemPackage => {
        console.log(systemPackage)
        if (systemPackage.length > 0) {

          this.systemPackage = systemPackage
        }
        else {
          this.listSystemPackageByCustomer(this.id);
        }
      })
    }
    else {
      this.listSystemPackageByCustomer(this.id);
    }

  }

  listSystemPackageByCustomer(id: string) {
    this.service.listSystemsByCustomer(id).subscribe(systemPackage => {
      this.systemPackage = systemPackage as [];
      console.log(systemPackage)
    })
  }
}
