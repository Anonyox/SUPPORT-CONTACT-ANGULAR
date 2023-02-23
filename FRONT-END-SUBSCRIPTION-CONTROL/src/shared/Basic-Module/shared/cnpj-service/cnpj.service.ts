import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequisitionService } from '../requisition-service/requisition.service';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {

  private readonly API_CNPJ = `${environment.API_CNPJ_WS}` //ENDEREÇO DA API CNPJ WS

  constructor(
    private service: RequisitionService //CENTRO DE REQUISIÇÃO 
  ) { }

  getCnpj(cnpj: any) {
    return this.service.getByCnpj(`${this.API_CNPJ}`, `${cnpj}`)
  }
  
}
