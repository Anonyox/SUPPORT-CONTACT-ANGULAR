import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';
import { ISystemPackage } from './system-package-interface';

@Injectable({
  providedIn: 'root'
})
export class SystemPackageService {

  private readonly API_PATH = `${environment.API_PATH}` //ENDEREÇO DA API(BACK END)

  private ISystemPackage!: ISystemPackage

  constructor(private service: RequisitionService) { }

  listSystemsByCustomer(customer_Id: string): Observable<any> {
    return this.service.get(`${this.API_PATH}ConnectionTables/SystemPackage/list/customer/` + customer_Id)
  }

  getSystemPackageByFilter(id:string,search: string): Observable<any> {
    return this.service.get(`${this.API_PATH}ConnectionTables/SystemPackage/pesquisa/${id}/${search}`)
  }

  createSystemPackage(T: any): Observable<any> {
    return this.service.post(`${this.API_PATH}ConnectionTables/SystemPackage`, this.ISystemPackage, T);
  }

  updateSystemPackage(T: any): Observable<any> {
    return this.service.put(`${this.API_PATH}ConnectionTables/SystemPackage/`+T.id, this.ISystemPackage, T);
  }

  getById(id:string){
    return this.service.get(`${this.API_PATH}ConnectionTables/SystemPackage/listFromUpdate/`+id)
  }


}
