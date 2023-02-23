import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgBrazilValidators } from 'ng-brazil';
import { CepService } from 'src/shared/Basic-Module/shared/cep-service/cep.service';
import { CnpjService } from 'src/shared/Basic-Module/shared/cnpj-service/cnpj.service';
import { DialogRequiredComponent } from 'src/shared/Basic-Module/shared/dialog-required/dialog-required.component';
import { CityService } from '../../../Basic-Module/city/city.service';
import { CustomerService } from '../customer.service';

import * as moment from 'moment';

import { DialogDocumentComponentComponent } from 'src/shared/Basic-Module/shared/dialog-document-component/dialog-document-component.component';
import { DialogDocumentCpfExistComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf-exist/dialog-document-cpf-exist.component';
import { DialogDocumentCpfComponent } from 'src/shared/Basic-Module/shared/dialog-document-cpf/dialog-document-cpf.component';
import { DialogDocumentExistsComponent } from 'src/shared/Basic-Module/shared/dialog-document-exists/dialog-document-exists.component';
import { DialogSuccessComponent } from 'src/shared/Basic-Module/shared/dialog-success/dialog-success.component';
import { DialogSuccessUpdateComponent } from 'src/shared/Basic-Module/shared/dialog-success-update/dialog-success-update.component';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})

export class CustomerUpdateComponent implements OnInit {

  //NOME PESSOA
  name: string = '';

  //ID CLIENTE
  id: string = '';

  //CRIAÇÃO DO FORMULÁRIO
  formulario: FormGroup;
  formulario2: FormGroup;
  formulario3: FormGroup;

  //ARRAY DE CLIENTES
  customers: any[] = [];

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

  //#endregion

  constructor(
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private cnpjService: CnpjService,
    private router: Router,
    private cityService: CityService,
    private service: CustomerService,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {

    //INICIA COM A DATA ATUAL
    this.dt = new Date();


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
      customerB: [true, Validators.required],
      city_Id: ['', Validators.required],

    })

    this.formulario2 = formBuilder.group({
      country_Id: ['', Validators.required],
      codIBGE: ['', Validators.required],
      name: ['', Validators.required],
      state: ['', Validators.required],
      dDD: ['', Validators.required],
      insercionDate: [this.dt]
    })

    this.formulario3 = formBuilder.group({
      id: ['', Validators.required],
      person_Id: ['', Validators.required],
      requestSupportUsername: ['', Validators.required],
      requestSupportPassword: ['', Validators.required],
      insercionDate: [this.dt, Validators.required]
    })





  }

  ngOnInit(): void {
    this.title.setTitle("Atualizar Cliente")

    this.listCustomers();

    const { params } = this.activatedRoute;

    params.subscribe(data => {
      this.id = data['id']
      this.getById(data['id']);
    })
  }

  //ENVIA O FORMULÁRIO
  submit() {

   




    if (this.formulario.valid) {
      console.log(this.formulario.value)

      this.service.updatePerson(this.formulario.value).subscribe(person => {

        this.service.updateCustomer(this.formulario3.value).subscribe(customer => {
          this.openDialogSuccessUpdate();
          this.router.navigate(['customer'])
        })
      })

    }
    else {
      console.log(this.formulario.value)
      this.openDialog();
    }
  }

  //VERÍFICA O TIPO DE PESSOA E MONTA O FORMULÁRIO
  // controlForm() {

  //   this.cep = "";
  //   this.cnpj = "";


  //   if (this.typePerson == 'Física') {
  //     this.formulario = this.formBuilder.group({
  //       id: ['', Validators.required],
  //       TypeOfPersonView: new FormControl({ value: 'Física', disabled: true }, [Validators.required,]),
  //       TypeOfPerson: ['', Validators.required],
  //       CpfCnpj: ['', [Validators.required, <any>NgBrazilValidators.cpf]],
  //       RGeStateRegistration: ['', Validators.required],
  //       RegistrationSituation: ['', Validators.required],
  //       Name: ['', Validators.required],
  //       FantasyName: [''],
  //       CodIBGE: ['', Validators.required],
  //       Cep: ['', Validators.required],
  //       City: [''],
  //       Address: ['', Validators.required],
  //       District: ['', Validators.required],
  //       Number: ['', Validators.required],
  //       Complement: [''],
  //       Email: ['', Validators.required],
  //       Landline: [''],
  //       CellPhone: [''],
  //       Cnae: [''],
  //       BirthDate: ['', Validators.required],
  //       InsercionDate: [this.dt, Validators.required],
  //       EmployeeB: [false, Validators.required],
  //       CustomerB: [true, Validators.required],
  //       City_Id: ['', Validators.required]

  //     })
  //   }
  //   else if (this.typePerson == 'Jurídica') {
  //     this.formulario = this.formBuilder.group({
  //       id: ['', Validators.required],
  //       TypeOfPersonView: new FormControl({ value: 'Jurídica', disabled: true }, [Validators.required,]),
  //       TypeOfPerson: ['', Validators.required],
  //       CpfCnpj: ['', [Validators.required, <any>NgBrazilValidators.cnpj]],
  //       RGeStateRegistration: ['', Validators.required],
  //       RegistrationSituation: ['', Validators.required],
  //       Name: ['', Validators.required],
  //       FantasyName: [''],
  //       CodIBGE: ['', Validators.required],
  //       Cep: ['', Validators.required],
  //       City: [''],
  //       Address: ['', Validators.required],
  //       District: ['', Validators.required],
  //       Number: ['', Validators.required],
  //       Complement: [''],
  //       Email: ['', Validators.required],
  //       Landline: [''],
  //       CellPhone: [''],
  //       Cnae: [''],
  //       BirthDate: ['', Validators.required],
  //       InsercionDate: [this.dt, Validators.required],
  //       EmployeeB: [false, Validators.required],
  //       CustomerB: [true, Validators.required],
  //       City_Id: ['', Validators.required]

  //     })
  //   }
  // }

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

      })
    }

    console.log(this.formulario.value)
  }

  //LISTA TODOS OS CLIENTES
  listCustomers() {
    this.service.listCustomers().subscribe(customers => {
      console.log(customers)
      this.customers = customers as [];
    })
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

  //BUSCA PELO ID
  getById(id: string) {
    this.service.getCustomerById(id).subscribe(customer => {
      console.log(customer)

      this.typePerson = customer.person.typeOfPerson;


      this.name = customer.person.name;


      this.controlForm();

      this.formulario.patchValue({
        id: customer.person.id,
        typeOfPerson: customer.person.typeOfPerson,
        cpFeCNPJ: customer.person.cpFeCNPJ,
        rGeStateRegistration: customer.person.rGeStateRegistration,
        registrationSituation: customer.person.registrationSituation,
        name: customer.person.name,
        fantasyName: customer.person.fantasyName,
        codIBGE: customer.person.codIBGE,
        cep: customer.person.cep,
        address: customer.person.address,
        district: customer.person.district,
        number: customer.person.number,
        complement: customer.person.complement,
        email: customer.person.email,
        landline: customer.person.landline,
        cellPhone: customer.person.cellPhone,
        cnae: customer.person.cnae,
        birthDate: moment(customer.person.birthDate).format('YYYY-MM-DD'),
        insercionDate: moment(customer.person.insercionDate).format('YYYY-MM-DD'),
        employeeB: customer.person.employeeB,
        customerB: customer.person.customerB,
        city_Id: customer.person.city.id
      })

      this.formulario3.patchValue({
        id: customer.id,
        person_Id: customer.person.id,
        requestSupportUsername: customer.requestSupportUsername,
        requestSupportPassword: customer.requestSupportPassword,
        insercionDate: moment(customer.insercionDate).format('YYYY-MM-DD')
        ,
      })


      this.searchCep(customer.person.cep);

      console.log(this.formulario.value)
    })




  }

  // //CONSULTA CNPJ
  // searchCnpj(cnpj: string) {
  //   this.cnpjService.getCnpj(cnpj).subscribe(cnpj => {

  //     this.formulario.patchValue({
  //       Name: cnpj.razao_social,
  //       Cnae: cnpj.estabelecimento.atividade_principal.id,
  //       FantasyName: cnpj.nome_fantasia,
  //       RGeStateRegistration:
  //         cnpj.estabelecimento.inscricoes_estaduais[0].inscricao_estadual,
  //       Landline: cnpj.estabelecimento.ddd1 + cnpj.estabelecimento.telefone1,
  //       Cep: cnpj.estabelecimento.cep,
  //       City: cnpj.estabelecimento.cidade.nome,
  //       Address:
  //         cnpj.estabelecimento.tipo_logradouro +
  //         ' ' +
  //         cnpj.estabelecimento.logradouro,
  //       Number: cnpj.estabelecimento.numero,
  //       Complement: cnpj.estabelecimento.complemento,
  //       District: cnpj.estabelecimento.bairro,
  //       State: cnpj.estabelecimento.estado.sigla,
  //       CodIBGE: cnpj.estabelecimento.cidade.ibge,
  //       Email: cnpj.estabelecimento.email,
  //       BirthDate: cnpj.estabelecimento.data_inicio_atividade,
  //     });

  //     if (cnpj.estabelecimento.telefone1 == null) {
  //       this.formulario.patchValue({
  //         Landline: '',
  //       });
  //     }

  //     this.searchCep(cnpj.estabelecimento.cep);
  //   })
  // }

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

  //MENSAGEM DE SUCESSO UPDATE
  openDialogSuccessUpdate() {
    const dialogRef = this.dialog.open(DialogSuccessUpdateComponent, { restoreFocus: false });

  }

}