import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgBrazilValidators } from 'ng-brazil';
import { CepService } from 'src/shared/Basic-Module/shared/cep-service/cep.service';
import { CnpjService } from 'src/shared/Basic-Module/shared/cnpj-service/cnpj.service';
import { CityService } from '../../../Basic-Module/city/city.service';
import { EmployeeService } from '../employee.service';

import { DialogDocumentComponentComponent } from 'src/shared/Basic-Module/shared/dialog-document-component/dialog-document-component.component';
import { DialogDocumentCpfExistComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf-exist/dialog-document-cpf-exist.component';
import { DialogDocumentCpfComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf/dialog-document-cpf.component';
import { DialogDocumentExistsComponent } from 'src/shared/Basic-Module/shared/dialog-document-exists/dialog-document-exists.component';
import { DialogRequiredComponent } from 'src/shared/Basic-Module/shared/dialog-required/dialog-required.component';
import { DialogSuccessComponent } from 'src/shared/Basic-Module/shared/dialog-success/dialog-success.component';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {

  //CRIAÇÃO DO FORMULÁRIO
  formulario: FormGroup;
  formulario2: FormGroup;
  formulario3: FormGroup;

  //ARRAY DE CLIENTES
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
  //#endregion

  constructor(
    private formBuilder: FormBuilder,

    private cepService: CepService,
    private cnpjService: CnpjService,
    private cityService: CityService,
    private service: EmployeeService,

    private title: Title,
    public dialog: MatDialog,
    private router: Router
  ) {

    //INICIA COM A DATA ATUAL
    this.dt = new Date();

    //FORMULÁRIO DE PESSOA
    this.formulario = formBuilder.group({

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
      employeeB: [true, Validators.required],
      customerB: [false, Validators.required],
      city_Id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
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

      personId: [''],
      permissions_Id: [''],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      insercionDate: [this.dt, Validators.required]
    })

  }




  ngOnInit(): void {
    this.title.setTitle("Novo Usuário"),
      this.listEmployees();
    this.listPermissions();
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

  setPermissions(item: any) {
    this.formulario3.patchValue({
      permissions_Id: item.id
    })
    console.log(this.formulario3.value);
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

  //VERÍFICA O TIPO DE PESSOA E MONTA O FORMULÁRIO
  controlForm() {
    this.cep = "";
    this.cnpj = "";

    if (this.typePerson == 'Física') {
      this.formulario = this.formBuilder.group({
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
        username: ['', Validators.required],
        password: ['', Validators.required],

      })
    }
    else if (this.typePerson == 'Jurídica') {
      this.formulario = this.formBuilder.group({
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
        username: ['', Validators.required],
        password: ['', Validators.required],

      })
    }

    console.log(this.formulario.value)
  }

  //ENVIA O FORMULÁRIO
  submit() {







    if (this.formulario.valid) {
      console.log(this.formulario.value)

      this.service.createPerson(this.formulario.value).subscribe(person => {
        this.formulario3.patchValue({
          userName: this.formulario.value.username,
          password: this.formulario.value.password,
          personId: person.id,
          insercionDate: this.dt

        })
        if (this.formulario3.valid) {

          this.openDialogSuccess();
          this.listEmployees();
          this.service.createEmployee(this.formulario3.value).subscribe(employee => {
            this.router.navigate([`employee/detail/${employee.id}`])
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

  //CONSULTA CNPJ
  searchCnpj(cnpj: string) {

    if (this.formulario.controls['cpFeCNPJ'].valid) {
      var str = cnpj.replace('-', '').replace('.', '').replace('/', '');
      console.log(str)
      this.service.getEmployeeByCnpj(str).subscribe(cnpj => {
        if (cnpj != null) {
          this.openDialogDocumentCnpjExists();

          this.formulario.patchValue({
            cpFeCNPJ: ""
          })
        }
        else {
          this.cnpjService.getCnpj(str).subscribe(cnpj => {

            this.formulario.patchValue({
              name: cnpj.razao_social,
              cnae: cnpj.estabelecimento.atividade_principal.id,
              fantasyName: cnpj.nome_fantasia,
              rGeStateRegistration:
                cnpj.estabelecimento.inscricoes_estaduais[0].inscricao_estadual,
              landline: cnpj.estabelecimento.ddd1 + cnpj.estabelecimento.telefone1,
              cep: cnpj.estabelecimento.cep,
              city: cnpj.estabelecimento.cidade.nome,
              address:
                cnpj.estabelecimento.tipo_logradouro +
                ' ' +
                cnpj.estabelecimento.logradouro,
              number: cnpj.estabelecimento.numero,
              complement: cnpj.estabelecimento.complemento,
              district: cnpj.estabelecimento.bairro,
              state: cnpj.estabelecimento.estado.sigla,
              codIBGE: cnpj.estabelecimento.cidade.ibge,
              email: cnpj.estabelecimento.email,
              birthDate: cnpj.estabelecimento.data_inicio_atividade,
            });

            if (cnpj.estabelecimento.telefone1 == null) {
              this.formulario.patchValue({
                landline: '',
              });
            }

            this.searchCep(cnpj.estabelecimento.cep);
          })
        }
        console.log(cnpj)
      })

    }
    else {
      this.openDialogDocumentCnpj();
      this.formulario.patchValue({
        cpFeCNPJ: ""
      })
    }

  }

  //CONSULTA CPF
  searchCpf(cpf: string) {

    if (this.formulario.controls['cpFeCNPJ'].valid) {
      var str = cpf.replace('-', '').replace('.', '').replace('/', '');
      this.service.getEmployeeByCpf(str).subscribe(cpf => {
        console.log(cpf)

        if (cpf != null) {
          this.openDialogDocumentCpfExists();
          this.formulario.patchValue({
            cpFeCNPJ: ""
          })
        }
      })
    }
    else {
      this.openDialogDocumentCpf();

      this.formulario.patchValue({
        cpFeCNPJ: ""
      })
    }
  }

  //RETORNA ERRO PARA CAMPO VALIDADO
  getErrorMessage() {

    return 'Campo requerido';
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
