import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDocumentComponentComponent } from 'src/shared/Basic-Module/shared/dialog-document-component/dialog-document-component.component';
import { DialogDocumentCpfExistComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf-exist/dialog-document-cpf-exist.component';
import { DialogDocumentCpfComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf/dialog-document-cpf.component';
import { DialogDocumentExistsComponent } from 'src/shared/Basic-Module/shared/dialog-document-exists/dialog-document-exists.component';
import { DialogRequiredComponent } from 'src/shared/Basic-Module/shared/dialog-required/dialog-required.component';
import { DialogSuccessComponent } from 'src/shared/Basic-Module/shared/dialog-success/dialog-success.component';
import { SystemService } from '../../../Basic-Module/system/system.service';
import { SystemPackageService } from '../system-package.service';

@Component({
  selector: 'app-system-package-create',
  templateUrl: './system-package-create.component.html',
  styleUrls: ['./system-package-create.component.css']
})
export class SysTemPackageCreateComponent implements OnInit {


  //ARRAY DE SISTEMAS
  systemPackage: any[] = [];

  system: any[] = [];

  //NOME PESSOA
  name: string = '';

  //ID CLIENTE
  id: string = '';

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  //ARMAZENA A DATA ATUAL
  dt: Date;

  formulario: FormGroup;

  //#region CONTROLADORES VALIDAÇÃO
  System = new FormControl('', Validators.required);
  Status = new FormControl('', [Validators.required]);
  DaysOfBlocked = new FormControl('', Validators.required);


  //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
  displayedColumns: string[] = ['Title', 'Description', 'Status', 'Acoes'];


  constructor(private service: SystemPackageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceSystem: SystemService,
    public dialog: MatDialog,
    private router: Router) {

    //INICIA COM A DATA ATUAL
    this.dt = new Date();

    this.formulario = this.formBuilder.group({
      Search: [''],
      system_Id: ['', <any>Validators.required],
      customer_Id: ['', <any>Validators.required],
      status: ['', <any>Validators.required],
      daysOfBlocked: ['', <any>Validators.required],
      insercionDate: [this.dt, <any>Validators.required]

    })
  }

  ngOnInit(): void {


    const { params } = this.activatedRoute;

    params.subscribe(data => {
      this.id = data['id']
      this.name = data['name']

      this.listSystemPackageByCustomer(data['id']);
      this.listSystemNoVinc(data['id'])
    })
  }


  //PESQUISA
  filterInDesc(search: string) {
    console.log(search)
    console.log(search.length)
    if (search != null && search.length >= 1) {
      var str = search.replace('/', '');
      this.service.getSystemPackageByFilter(this.id, str).subscribe(systemPackage => {
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

  listSystemNoVinc(id: string) {
    this.serviceSystem.listSystemNoVincCustomer(id).subscribe(system => {
      this.system = system as []
      console.log(system)
    })
  }

  listSystemPackageByCustomer(id: string) {
    this.service.listSystemsByCustomer(id).subscribe(systemPackage => {
      this.systemPackage = systemPackage as [];
      console.log(systemPackage)
    })
  }


  //RETORNA ERRO PARA CAMPO VALIDADO
  getErrorMessage() {

    return 'Campo requerido';
  }

  submit() {
    this.formulario.patchValue({
      customer_Id: this.id

    })

    if (this.formulario.valid) {
      this.service.createSystemPackage(this.formulario.value).subscribe(systemPackage => {
        this.openDialogSuccess();
        this.router.navigate([`systemPackage/${this.id}/${this.name}`])
      })
    }
    else {
      this.openDialog();
    }
  }

  setSystem(item: any) {
    this.formulario.patchValue({
      system_Id: item.id
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


}
