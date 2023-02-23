import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequisitionService } from '../requisition-service/requisition.service';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly API_CEP = `${environment.API_CEP}` //ENDEREÇO DA API VIA CEP

  constructor(
    private service: RequisitionService //CENTRO DE REQUISIÇÃO 
  ) { }

  getCep(cep: string) { //MÉTODO DE BUSCA
    return this.service.getByCep(`${this.API_CEP}`, `${cep}`)
  }
}
