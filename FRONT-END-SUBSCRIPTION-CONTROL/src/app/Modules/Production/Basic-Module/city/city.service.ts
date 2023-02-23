import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';
import { ICity } from './city-interface';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly API_PATH = `${environment.API_PATH}` //ENDEREÇO DA API VIA CEP
 

  constructor(private service:RequisitionService) { }

  private ICity!: ICity;

  listCity() : Observable<any> { //MÉTODO DE BUSCA
    return this.service.get(`${this.API_PATH}basic/city`)
  }

  getBySearchFilter(search:string){
    return this.service.get(`${this.API_PATH}basic/city/pesquisa/${search}`)
  }

  getCityByName(city: string): Observable<any> {
    return this.service.getByName(`${this.API_PATH}basic/City/Name`, `${city}`)
  }

  create(T: any): Observable<any> {
    console.log(this.ICity)
    return this.service.post(`${this.API_PATH}basic/City`, this.ICity, T)
  }

}
