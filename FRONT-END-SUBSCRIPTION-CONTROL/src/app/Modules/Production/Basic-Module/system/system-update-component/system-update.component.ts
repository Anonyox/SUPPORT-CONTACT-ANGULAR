import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DialogDocumentComponentComponent } from 'src/shared/Basic-Module/shared/dialog-document-component/dialog-document-component.component';
import { DialogDocumentCpfExistComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf-exist/dialog-document-cpf-exist.component';
import { DialogDocumentCpfComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf/dialog-document-cpf.component';
import { DialogDocumentExistsComponent } from 'src/shared/Basic-Module/shared/dialog-document-exists/dialog-document-exists.component';
import { DialogRequiredComponent } from 'src/shared/Basic-Module/shared/dialog-required/dialog-required.component';
import { DialogSuccessUpdateComponent } from 'src/shared/Basic-Module/shared/dialog-success-update/dialog-success-update.component';
import { DialogSuccessComponent } from 'src/shared/Basic-Module/shared/dialog-success/dialog-success.component';
import { SystemService } from '../system.service';


@Component({
  selector: 'app-system-update',
  templateUrl: './system-update.component.html',
  styleUrls: ['./system-update.component.css']
})
export class SystemUpdateComponent implements OnInit {

  //NOME PESSOA
  name: string = '';

  //ID CLIENTE
  id: string = '';

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

  constructor(private title: Title, private service: SystemService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router,private activatedRoute: ActivatedRoute) {

    //INICIA COM A DATA ATUAL
    this.dt = new Date();


    this.formulario = this.formBuilder.group({
      Search: [''],
      id:['',<any>Validators.required],
      title: ['', <any>Validators.required],
      description: ['', <any>Validators.required],
      systemPublic_Date: ['', <any>Validators.required],
      insercionDate: [this.dt, <any>Validators.required]
    })
  }

  ngOnInit(): void {
    
   

    this.title.setTitle("Atualizar Solução")

    this.listSystems();

 

    const { params } = this.activatedRoute;

    params.subscribe(data => {
      this.id = data['id']
      this.getById(data['id']);
    })
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

//ENVIA O FORMULÁRIO
submit() {

   




  if (this.formulario.valid) {
    console.log(this.formulario.value)

    this.service.updateSystem(this.formulario.value).subscribe(person => {

     
        this.openDialogSuccessUpdate();
        this.router.navigate(['system'])
     
    })

  }
  else {
    console.log(this.formulario.value)
    this.openDialog();
  }
}


  getById(id: string) {
    this.service.getSystemById(id).subscribe(system => {
      

      console.log(system)


      this.name = system.title;

      this.formulario.patchValue({
        id:system.id,
        title:system.title,
        description:system.description,
        systemPublic_Date: moment(system.systemPublic_Date).format('YYYY-MM-DD'),
        insercionDate: moment(system.insercionDate).format('YYYY-MM-DD'),
      })


     

    

     

     


     

      console.log(this.formulario.value)
    })




  }


   //MENSAGEM DE ERRO CAMPOS REQUERIDOS
   openDialog() {
    const dialogRef = this.dialog.open(DialogRequiredComponent, { restoreFocus: false });
  }

  //MENSAGEM DE ERRO CNPJ INVÁLIDO
  openDialogDocumentCnpj() {
    const dialogRef = this.dialog.open(DialogDocumentComponentComponent, { restoreFocus: false });
  }

  //MENSAGEM DE ERRO CNPJ JÁ CADASTRADO
  openDialogDocumentCnpjExists() {
    const dialogRef = this.dialog.open(DialogDocumentExistsComponent, { restoreFocus: false });
  }

  //MENSAGEM DE ERRO CPF INVÁLIDO
  openDialogDocumentCpf() {
    const dialogRef = this.dialog.open(DialogDocumentCpfComponent, { restoreFocus: false });
  }

  //MENSAGEM DE ERRO CPF JÁ CADASTRADO
  openDialogDocumentCpfExists() {
    const dialogRef = this.dialog.open(DialogDocumentCpfExistComponent, { restoreFocus: false });
  }

  //MENSAGEM DE SUCESSO
  openDialogSuccess() {
    const dialogRef = this.dialog.open(DialogSuccessComponent, { restoreFocus: false });
  }

  //MENSAGEM DE SUCESSO UPDATE
  openDialogSuccessUpdate() {
    const dialogRef = this.dialog.open(DialogSuccessUpdateComponent, { restoreFocus: false });

  }


}
