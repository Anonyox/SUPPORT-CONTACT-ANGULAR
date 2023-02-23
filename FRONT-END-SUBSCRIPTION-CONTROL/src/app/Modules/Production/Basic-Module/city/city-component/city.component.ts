import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CityService } from '../city.service';




@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {

  //ARRAY DE CIDADES
  citys: any[] = [];

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  //FORMULÁRIO
  formulario: FormGroup;

  //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
  displayedColumns: string[] = ['Cidade', 'Estado'];


  constructor(private service: CityService, private title: Title, private formBuilder: FormBuilder) {

    this.formulario = this.formBuilder.group({
      Search: ['']
    })

    // Assign the data to the data source for the table to render
  }

  ngOnInit(): void {
    this.listCity();
    this.title.setTitle("Cidades")
  }

  //LISTA TODAS AS CIDADES
  listCity() {
    this.service.listCity().subscribe(city => {
      
      this.citys = city as []
    })
  }

  //PESQUISA
  filterInDesc(search: string) {
    if (search != null && search.length >= 1) {
      var str = search.replace('/', '');
      this.service.getBySearchFilter(str).subscribe(citys => {
        if (citys.length > 0) {

          this.citys = citys
        }
        else {
          this.listCity();
        }
      })
    }
    else {
      this.listCity();
    }

  }

}