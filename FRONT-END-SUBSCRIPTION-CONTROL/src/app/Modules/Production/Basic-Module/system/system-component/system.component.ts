import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SystemService } from '../system.service';



@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
 //ARRAY DE SISTEMAS
 systems: any[] = [];

 //ARMAZENA DADOS PARA BUSCA
 search: string = "";

 formulario: FormGroup;

 //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
 displayedColumns: string[] = ['Title', 'Description', 'SystemDatePublication', 'Acoes'];

 constructor(private title: Title, private service: SystemService, private formBuilder: FormBuilder) {
   this.formulario = this.formBuilder.group({
     Search: ['']
   })
 }

 ngOnInit(): void {
   this.title.setTitle("Soluções");
   this.listSystems();
 }

 //LISTA TODOS OS FUNCIONÁRIOS
 listSystems() {
   this.service.listSystems().subscribe(systems => {
     console.log(systems)
     this.systems = systems as []
   })
 }

 //PESQUISA
 filterInDesc(search: string) {
   console.log(search)
   console.log(search.length)
   if (search != null && search.length >= 1) {
     var str = search.replace('/', '');
     this.service.getSystemByFilter(str).subscribe(systems => {
       console.log(systems)
       if (systems.length > 0) {

         this.systems = systems
       }
       else {
         this.listSystems();
       }
     })
   }
   else {
     this.listSystems();
   }

 }

}
