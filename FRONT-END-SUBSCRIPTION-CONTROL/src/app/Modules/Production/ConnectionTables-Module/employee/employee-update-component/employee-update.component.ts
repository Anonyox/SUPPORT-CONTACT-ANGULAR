import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgBrazilValidators } from 'ng-brazil';
import { CepService } from 'src/shared/Basic-Module/shared/cep-service/cep.service';
import { CnpjService } from 'src/shared/Basic-Module/shared/cnpj-service/cnpj.service';
import { DialogDocumentComponentComponent } from 'src/shared/Basic-Module/shared/dialog-document-component/dialog-document-component.component';
import { DialogDocumentCpfExistComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf-exist/dialog-document-cpf-exist.component';
import { DialogDocumentCpfComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf/dialog-document-cpf.component';
import { DialogDocumentExistsComponent } from 'src/shared/Basic-Module/shared/dialog-document-exists/dialog-document-exists.component';
import { DialogRequiredComponent } from 'src/shared/Basic-Module/shared/dialog-required/dialog-required.component';
import { DialogSuccessUpdateComponent } from 'src/shared/Basic-Module/shared/dialog-success-update/dialog-success-update.component';
import { DialogSuccessComponent } from 'src/shared/Basic-Module/shared/dialog-success/dialog-success.component';
import { CityService } from '../../../Basic-Module/city/city.service';
import { CustomerService } from '../../customer/customer.service';
import { EmployeeService } from '../employee.service';

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
]

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})

export class EmployeeUpdateComponent implements OnInit {

  //NOME PESSOA
  name: string = '';

  //ID USUÁRIO
  id: string = '';

  permission: any;

  //CRIAÇÃO DO FORMULÁRIO
  formulario: FormGroup;
  formulario2: FormGroup;
  formulario3: FormGroup;

  //ARRAY DE USUÁRIOS
  employees: any[] = [];

  //ARRAY DE PERMISSÕES
  permissions: any[] = [];

  //VARIÁVEL VERIFICAÇÃO PARA TIPO DE PESSOA SELECIONADO
  typePerson: string = "Física";

  //ARMAZENA O CEP DIGITADO
  cep: string = "";

  //ARMAZENA O CNPJ DIGITADO
  cnpj: string = "";

  //ARMAZENA O CPF DIGITADO
  cpf: string = "";

  //ARMAZENA DADOS PARA BUSCA
  search: string = "";

  //ARMAZENA A DATA ATUAL
  dt: Date;

  //INICIA COLUNAS DA TABELA DE LISTAGEM DOS CLIENTES EXISTENTES
  displayedColumns: string[] = ['Nome', 'CPF/CNPJ', 'Cidade', 'Situação Cadastral', 'Acoes'];

  //#region CONTROLADORES VALIDAÇÃO
  TypeOfPersonView = new FormControl('', Validators.required);
  TypeOfPerson = new FormControl('', Validators.required);
  CpfCnpj = new FormControl('', [Validators.required]);
  RgeStateRegistration = new FormControl('', Validators.required);
  RegistrationSituation = new FormControl('', Validators.required);
  Name = new FormControl('', Validators.required);
  FantasyName = new FormControl('');
  CodIBGE = new FormControl('', Validators.required);
  Cep = new FormControl('', Validators.required);
  Address = new FormControl('', Validators.required);
  District = new FormControl('', Validators.required);
  Number = new FormControl('', Validators.required);
  Complement = new FormControl('');
  Email = new FormControl('', Validators.required);
  LandLine = new FormControl('');
  CellPhone = new FormControl('');
  Cnae = new FormControl('');
  BirthDate = new FormControl('', Validators.required);
  InsercionDate = new FormControl('', Validators.required);
  EmployeeB = new FormControl('', Validators.required);
  CustomerB = new FormControl('', Validators.required);
  City_Id = new FormControl('', Validators.required);

  Username = new FormControl('', Validators.required);
  Password = new FormControl('', Validators.required);

  Permission = new FormControl('');
  //#endregion

  constructor(
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private cnpjService: CnpjService,
    private router: Router,
    private cityService: CityService,
    private service: EmployeeService,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.dt = new Date();

    //FORMULÁRIO DE PESSOA
    this.formulario = formBuilder.group({
      id: ['', Validators.required],
      TypeOfPersonView: new FormControl({ value: 'Física', disabled: true }, [Validators.required,]),
      typeOfPerson: ['Física', Validators.required],
      cpFeCNPJ: ['', [Validators.required, <any>NgBrazilValidators.cpf]],
      Search: [''],
      rGeStateRegistration: ['', Validators.required],
      registrationSituation: [true, Validators.required],
      name: ['', Validators.required],
      fantasyName: [''],
      codIBGE: ['', Validators.required],
      cep: ['', Validators.required],
      city: [''],
      address: ['', Validators.required],
      district: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      email: ['', Validators.required],
      landline: [''],
      cellPhone: [''],
      cnae: [''],
      birthDate: ['', Validators.required],
      insercionDate: [this.dt, Validators.required],
      employeeB: [false, Validators.required],
      customerB: [false, Validators.required],
      city_Id: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      permission: [''],
    })

    //FORMULÁRIO DE CIDADE
    this.formulario2 = formBuilder.group({

      country_Id: ['', Validators.required],
      codIBGE: ['', Validators.required],
      name: ['', Validators.required],
      state: ['', Validators.required],
      dDD: ['', Validators.required],
      insercionDate: [this.dt]
    })

    //FORMULÁRIO DE USUÁRIO
    this.formulario3 = formBuilder.group({
      id: ['',Validators.required],
      personId: [''],
      permissions_Id: [''],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      insercionDate: [this.dt, Validators.required]
    })

  }

  ngOnInit(): void {
    this.title.setTitle("Atualizar Usuário")

    this.listEmployees();

    this.listPermissions();

    const { params } = this.activatedRoute;

    params.subscribe(data => {
      this.id = data['id']
      this.getById(data['id']);
    })
  }

  setPermissions(item: any) {
    this.formulario3.patchValue({
      permissions_Id: item.id
    })
    console.log(this.formulario3.value);
  }



  getById(id: string) {
    this.service.getEmployeeById(id).subscribe(employee => {
      console.log(employee)

      this.typePerson = employee.person.typeOfPerson;


      this.name = employee.person.name;


      this.controlForm();

      this.formulario.patchValue({
        id: employee.person.id,
        typeOfPerson: employee.person.typeOfPerson,
        cpFeCNPJ: employee.person.cpFeCNPJ,
        rGeStateRegistration: employee.person.rGeStateRegistration,
        registrationSituation: employee.person.registrationSituation,
        name: employee.person.name,
        fantasyName: employee.person.fantasyName,
        codIBGE: employee.person.codIBGE,
        cep: employee.person.cep,
        address: employee.person.address,
        district: employee.person.district,
        number: employee.person.number,
        complement: employee.person.complement,
        email: employee.person.email,
        landline: employee.person.landline,
        cellPhone: employee.person.cellPhone,
        cnae: employee.person.cnae,
        birthDate: moment(employee.person.birthDate).format('YYYY-MM-DD'),
        insercionDate: moment(employee.person.insercionDate).format('YYYY-MM-DD'),
        employeeB: employee.person.employeeB,
        customerB: employee.person.customerB,
        city_Id: employee.person.city.id,
        userName: employee.userName,
        password: employee.password,
        permission: employee.permissions.id
      })

     

      this.formulario3.patchValue({
        id: employee.id,
        personId: employee.person.id,
        permissions_Id: employee.permissions.id,
        userName: employee.userName,
        password: employee.password,
        insercionDate: moment(employee.insercionDate).format('YYYY-MM-DD')
        ,
      })


      this.searchCep(employee.person.cep);

      console.log(this.formulario.value)
    })




  }

  //VERÍFICA O TIPO DE PESSOA E MONTA O FORMULÁRIO
  controlForm() {
    this.cep = "";
    this.cnpj = "";

    if (this.typePerson == 'Física') {
      this.formulario = this.formBuilder.group({
        id: ['', Validators.required],
        TypeOfPersonView: new FormControl({ value: 'Física', disabled: true }, [Validators.required,]),
        typeOfPerson: ['Física', Validators.required],
        cpFeCNPJ: ['', [Validators.required, <any>NgBrazilValidators.cpf]],
        rGeStateRegistration: ['', Validators.required],
        registrationSituation: [true, Validators.required],
        name: ['', Validators.required],
        fantasyName: [''],
        codIBGE: ['', Validators.required],
        cep: ['', Validators.required],
        city: [''],
        address: ['', Validators.required],
        district: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        email: ['', Validators.required],
        landline: [''],
        cellPhone: [''],
        cnae: [''],
        birthDate: ['', Validators.required],
        insercionDate: [this.dt, Validators.required],
        employeeB: [false, Validators.required],
        customerB: [true, Validators.required],
        city_Id: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        permission: [''],

      })
    }
    else if (this.typePerson == 'Jurídica') {
      this.formulario = this.formBuilder.group({
        id: ['', Validators.required],
        TypeOfPersonView: new FormControl({ value: 'Jurídica', disabled: true }, [Validators.required,]),
        typeOfPerson: ['Jurídica', Validators.required],
        cpFeCNPJ: ['', [Validators.required, <any>NgBrazilValidators.cnpj]],
        rGeStateRegistration: ['', Validators.required],
        registrationSituation: [true, Validators.required],
        name: ['', Validators.required],
        fantasyName: [''],
        codIBGE: ['', Validators.required],
        cep: ['', Validators.required],
        city: [''],
        address: ['', Validators.required],
        district: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        email: ['', Validators.required],
        landline: [''],
        cellPhone: [''],
        cnae: [''],
        birthDate: ['', Validators.required],
        insercionDate: [this.dt, Validators.required],
        employeeB: [false, Validators.required],
        customerB: [true, Validators.required],
        city_Id: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        permission: [''],

      })
    }

    console.log(this.formulario.value)
  }

  //CONSULTA DE CEP
  searchCep(cep: string) {

    if (this.formulario.controls['cep'].valid) {
      var str = cep.replace('-', '').replace('.', '');
      this.cepService.getCep(str).subscribe(cep => {
        console.log(cep)
        if (cep.erro == true) {
          alert('CEP NÃO ENCONTRADO');

          this.formulario.patchValue({
            cep: '',
            city: '',
            codIBGE: '',
            address: '',
            district: '',
          });
        } else {


          this.formulario.patchValue({
            city: cep.localidade,
            codIBGE: cep.ibge,

          })

          console.log(this.formulario.value)

          if (this.formulario.value.address == "" || this.formulario.value.address == null) {
            this.formulario.patchValue({
              address: cep.logradouro,
            })
          }

          if (this.formulario.value.district == "" || this.formulario.value.district == null) {
            this.formulario.patchValue({
              district: cep.bairro,
            })
          }

          this.cityService.getCityByName(cep.localidade).subscribe(cityName => {


            if (cityName != null) {

              this.formulario.patchValue({
                city_Id: cityName.id,
              })

            }

            else {



              this.formulario2.patchValue({
                country_Id: "b65e7a52-e04d-43d3-bd30-a3492953c521",
                codIBGE: cep.ibge,
                name: cep.localidade,
                state: cep.uf,
                dDD: cep.ddd,
                insercionDate: this.dt
              })

              this.cityService.create(this.formulario2.value).subscribe(city => {
                this.formulario.patchValue({
                  city_Id: city.id,
                })
              }, err => {
                console.log(err)
              })

            }


          })
          //REALIZAR VERIFICAÇÃO DE CIDADE CADASTRADA PELO CEP NO BANCO DE DADOS
        }
      })
    }
  }

 //ENVIA O FORMULÁRIO
 submit() {







  if (this.formulario.valid) {
    console.log(this.formulario.value)

    this.service.updatePerson(this.formulario.value).subscribe(person => {
      this.formulario3.patchValue({
        userName: this.formulario.value.userName,
        password: this.formulario.value.password,
      })
      if (this.formulario3.valid) {

        
        this.service.updateEmployee(this.formulario3.value).subscribe(employee => {
          this.openDialogSuccessUpdate();
          this.listEmployees();
          this.router.navigate(['employee'])
        })
       
      }
      else {
        console.log(this.formulario.value)
        console.log(this.formulario3.value)
        this.openDialog();

      }

    })

  }
  else {
    console.log(this.formulario.value)
    console.log(this.formulario3.value)
    this.openDialog();
  }

}

  //RETORNA ERRO PARA CAMPO VALIDADO
  getErrorMessage() {
    return 'Campo requerido';
  }

  //LISTA TODOS OS FUNCIONÁRIOS
  listEmployees() {
    this.service.listEmployees().subscribe(employees => {
      console.log(employees)
      this.employees = employees as []
    })
  }

  listPermissions() {
    this.service.listPermissions().subscribe(permissions => {
      this.permissions = permissions as []
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
