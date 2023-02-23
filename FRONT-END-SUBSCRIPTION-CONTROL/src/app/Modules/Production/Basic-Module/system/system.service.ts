import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';
import { ISystem } from './system.-interface';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private readonly API_PATH = `${environment.API_PATH}` //ENDEREÇO DA API(BACK END)
  private ISystem!: ISystem
  

 

  constructor(private service: RequisitionService) { }

  listSystems(): Observable<any> {
    return this.service.get(`${this.API_PATH}basic/System`)
  }

  updateSystem(T:any): Observable<any>{
    return this.service.put(`${this.API_PATH}basic/System/`+ T.id,this.ISystem,T)
  }

  getSystemByFilter(search: string): Observable<any> {
    return this.service.get(`${this.API_PATH}basic/System/pesquisa/${search}`)
  }

  getSystemById(id:string): Observable<any>{
    return this.service.get(`${this.API_PATH}basic/System/`+id);
  }

  createSystem(T:any): Observable<any>{
    return this.service.post(`${this.API_PATH}basic/System`,this.ISystem,T)
  }

  listSystemNoVincCustomer(id:string){
    return this.service.get(`${this.API_PATH}basic/System/noVincCustomer/`+id)
  }
}
