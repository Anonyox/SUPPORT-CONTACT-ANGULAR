import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';
import { ICustomer, IPerson } from './customer-interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly API_PATH = `${environment.API_PATH}` //ENDEREÇO DA API(BACK END)
  private IPerson!: IPerson;
  private ICustomer!: ICustomer;

  constructor(private service:RequisitionService) { }

  listCustomers(): Observable<any>{
    return this.service.get(`${this.API_PATH}ConnectionTables/Customer`)
  }


  getCustomerByCnpj(cnpj: string): Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Person/doc/` + cnpj)
  }

  getCustomerByCpf(cpf: string): Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Person/doc/` + cpf)
  }


  getCustomerById(id:string): Observable<any>{
    return this.service.get(`${this.API_PATH}ConnectionTables/Customer/` + id)
  }

  getCustomerByFilter(search:string) : Observable<any> {
    return this.service.get(`${this.API_PATH}ConnectionTables/Customer/pesquisa/${search}`)
  }


  createPerson(T:any): Observable<any>{
    return this.service.post(`${this.API_PATH}basic/Person`,this.IPerson,T)
  }

  createCustomer(T:any): Observable<any> {
    return this.service.post(`${this.API_PATH}ConnectionTables/Customer`,this.ICustomer,T)
  }

  updatePerson(T:any):Observable<any> {
    return this.service.put(`${this.API_PATH}basic/Person/` + T.id,this.IPerson,T)
  }

  updateCustomer(T:any):Observable<any> {
    return this.service.put(`${this.API_PATH}ConnectionTables/Customer/`+T.id,this.ICustomer,T)
  }
 
}
