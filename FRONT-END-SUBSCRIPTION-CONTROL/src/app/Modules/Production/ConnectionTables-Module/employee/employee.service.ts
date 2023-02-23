import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';
import { IAuth } from './auth-interface.interface';
import { IEmployee, IPerson } from './employee-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly API_PATH = `${environment.API_PATH}` //ENDEREÇO DA API(BACK END)
  private IPerson!: IPerson;
  private IEmployee!: IEmployee;

  private IAuth!: IAuth

  constructor(private service: RequisitionService) { }

  listEmployees(): Observable<any> {
    return this.service.get(`${this.API_PATH}ConnectionTables/Employee`)
  }

  listPermissions():Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Permissions`)
  }

  getEmployeeByCnpj(cnpj: string): Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Person/doc/` + cnpj)
  }

  getEmployeeByCpf(cpf: string): Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Person/doc/` + cpf)
  }

  getEmployeeById(id: string): Observable<any> {
    return this.service.get(`${this.API_PATH}ConnectionTables/Employee/` + id)
  }

  getEmployeeByFilter(search: string): Observable<any> {
    return this.service.get(`${this.API_PATH}ConnectionTables/Employee/pesquisa/${search}`)
  }

  createPerson(T: any): Observable<any> {
    return this.service.post(`${this.API_PATH}basic/Person`, this.IPerson, T)
  }

  createEmployee(T: any): Observable<any> {
    return this.service.post(`${this.API_PATH}ConnectionTables/Employee`, this.IEmployee, T)
  }

  updatePerson(T: any): Observable<any> {
    return this.service.put(`${this.API_PATH}basic/Person/` + T.id, this.IPerson, T)
  }

  updateEmployee(T: any): Observable<any> {
    return this.service.put(`${this.API_PATH}ConnectionTables/Employee/` + T.id, this.IEmployee, T)
  }

  auth(T: any): Observable<any> {
    return this.service.auth(`${this.API_PATH}auth/login`, this.IAuth, T);
  }

  listSupportsByCalledEmployee():Observable<any>{
    return this.service.get(`${this.API_PATH}ConnectionTables/Employee`)
  }
}
