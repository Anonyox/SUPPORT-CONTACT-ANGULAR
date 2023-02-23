import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  private readonly API = `${environment.API_PATH}`;

  

  constructor(private http: HttpClient,) { }

  get(route: any): Observable<any> {
    var headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(`${route}`, { headers: headers })
  }

  post(route: any, TModel: any, T: any): Observable<any> {
    TModel = T;
    console.log(TModel)
    var headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(`${route}`,  TModel , { headers: headers })
  }

  put(route: any, TModel: any, T: any) : Observable<any> {
    TModel = T;
    console.log(TModel)
    var headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http
      .put(`${route}`, TModel, { headers: headers })

  }

  getByName(route: any, name: any) : Observable<any> {
    var headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http
      .get(`${route}/${name}`, { headers: headers })

  }


  getByCep(route: any, cep: any): Observable<any> {
    return this.http.get(`${route}${cep}/json`)
  }

  getByCnpj(route: any, cnpj: any): Observable<any> {
    var headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(`${route}${cnpj}`, { headers: headers })
  }






  
  auth(rota: any, TModel: any, T: any): Observable<any> {
    return this.http.post(`${rota}`, T);
  }

  ping() : Observable<any> {

    var headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http
      .get(`${this.API}auth/ping`, { headers: headers });

  }

  logout() {
    var headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http
      .get(`${this.API}auth/logout`, { headers: headers })
      .pipe(tap(console.log))
  }

}
