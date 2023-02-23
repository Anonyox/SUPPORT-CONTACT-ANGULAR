import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogRequiredComponent } from 'src/shared/Basic-Module/shared/dialog-required/dialog-required.component';
import { DialogSuccessComponent } from 'src/shared/Basic-Module/shared/dialog-success/dialog-success.component';
import { SystemService } from '../system.service';



@Component({
  selector: 'app-system-create',
  templateUrl: './system-create.component.html',
  styleUrls: ['./system-create.component.css']
})
export class SystemCreateComponent implements OnInit {
  //ARRAY DE SISTEMAS
  systems: any[] = [];

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  //ARMAZENA A DATA ATUAL
  dt: Date;

  formulario: FormGroup;

  //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
  displayedColumns: string[] = ['Title', 'Description', 'SystemDatePublication', 'Acoes'];

  Name = new FormControl('', Validators.required);
  Description = new FormControl('', [Validators.required]);
  SystemPublicationDate = new FormControl('', Validators.required);

  constructor(private title: Title, private service: SystemService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) {

    //INICIA COM A DATA ATUAL
    this.dt = new Date();


    this.formulario = this.formBuilder.group({
      Search: [''],
      title: ['', <any>Validators.required],
      description: ['', <any>Validators.required],
      systemPublic_Date: ['', <any>Validators.required],
      insercionDate: [this.dt, <any>Validators.required]
    })
  }

  ngOnInit(): void {
    this.title.setTitle("Cadastrar Soluções");
    this.listSystems();
  }

  //LISTA TODOS OS FUNCIONÁRIOS
  listSystems() {
    this.service.listSystems().subscribe(systems => {
      console.log(systems)
      this.systems = systems as []
    })
  }

  //RETORNA ERRO PARA CAMPO VALIDADO
  getErrorMessage() {

    return 'Campo requerido';
  }

  submit() {
    if (this.formulario.valid) {
      this.service.createSystem(this.formulario.value).subscribe(system => {
        this.openDialogSuccess();
        this.router.navigate([`system/detail/${system.id}`])
      })
    }
    else {
      this.openDialog();
    }
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

  //MENSAGEM DE ERRO CAMPOS REQUERIDOS
  openDialog() {
    const dialogRef = this.dialog.open(DialogRequiredComponent, { restoreFocus: false });
  }

  //MENSAGEM DE SUCESSO
  openDialogSuccess() {

    const dialogRef = this.dialog.open(DialogSuccessComponent, { restoreFocus: false });
  }

}
