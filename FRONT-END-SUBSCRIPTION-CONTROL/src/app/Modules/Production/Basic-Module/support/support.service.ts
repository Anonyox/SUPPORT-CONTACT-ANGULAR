import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';
import { ISupport, ISupportCalled, ISupportCalledMessages, ISupportEndCalled } from './support-interface';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private readonly API_PATH = `${environment.API_PATH}` //ENDEREÇO DA API(BACK END)
  private ISupport! : ISupport;
  private ISupportCalledMessages!:ISupportCalledMessages;
  private ISupportCalled! : ISupportCalled;
  private ISupportEndCalled! : ISupportEndCalled;

  constructor(private service:RequisitionService) { }

  createSupportCalledMessage(T:any):Observable<any>{
    return this.service.post(`${this.API_PATH}Connectiontables/SupportCalledMessages`,this.ISupportCalledMessages,T)
  }

  getSupportByFilter(search:string): Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/`+search)
  }

  getSupportByFilterInAttendance(search:string): Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/inAttendance/`+search)
  }

  getSupportByFilterEndCalled(search:string): Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/endCalled/`+search)
  }

  getSupportByFilterCustomer(search:string,customer_Id:string) : Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/customer/`+search+'/'+customer_Id)
  }

  getSupportByFilterCustomerInAttendance(search:string,customer_Id:string) : Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/customer/inAttendance/`+search+'/'+customer_Id)
  }

  getSupportByFilterEmployeeInAttendance(search:string,employee_Id:string) : Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/customer/inAttendance/`+search+'/'+employee_Id)
  }

  getSupportByFilterCustomerEndCalled(search:string,customer_Id:string) : Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/customer/endCalled/`+search+'/'+customer_Id)
  }

  getSupportByFilterEmployeeEndCalled(search:string,employee_Id:string) : Observable<any> {
    return this.service.get(`${this.API_PATH}basic/Support/pesquisa/customer/endCalled/`+search+'/'+employee_Id)
  }

  supportUpdate(T:any) : Observable<any> {
    return this.service.put(`${this.API_PATH}basic/Support/`+T.id,this.ISupport,T)
  }

  createSupportCalled(T:any) : Observable<any> {
    return this.service.post(`${this.API_PATH}ConnectionTables/SupportCalled`,this.ISupportCalled,T)
  }

  createSupportEndCalled(T:any) : Observable<any> {
    return this.service.post(`${this.API_PATH}ConnectionTables/SupportCalledEnd`,this.ISupportEndCalled,T)
  }

  listSupport():Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support`);
  }

  listSupportInCalled():Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/inAttendance`);
  }

  listSupportEndCalled():Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/endCalled`);
  }

  listSupportByCustomer(customer_Id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/list/customer/`+customer_Id)
  }

  listSupportByCustomerInAttendence(customer_Id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/list/customer/inAttendance/`+customer_Id)
  }

  listSupportByEmployeeInAttendence(employee_Id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/list/employee/inAttendance/`+employee_Id)
  }

  listSupportByCustomerEndCalled(customer_Id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/list/customer/endCalled/`+customer_Id)
  }

  listSupportByEmployeeEndCalled(employee_Id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/list/employee/endCalled/`+employee_Id)
  }

  listSupportByEmployeeByCustomerEndCalled(search:string,employee_Id:string,customer_Id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/list/employee/endCalled/`+employee_Id+"/"+customer_Id)
  }

  listSupportByEmployeeByCustomerInAttendance(search:string,employee_Id:string,customer_Id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}basic/Support/list/inAttendance/endCalled/`+employee_Id+"/"+customer_Id)
  }

  listSupportCalledMessagesFromId(id:string):Observable<any>{
    return this.service.get(`${this.API_PATH}ConnectionTables/SupportCalledMessages/fromSupportCalled/${id}`)
  }

  updateSupportInCalledTransfering(T:any):Observable<any> {
    return this.service.put(`${this.API_PATH}ConnectionTables/SupportCalled/`+T.id,this.ISupportCalled,T)
  }
}
