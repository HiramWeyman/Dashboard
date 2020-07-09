import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { TpagosOnline } from '../pagoServicios/tpagosonline';

@Injectable({
  providedIn: 'root'
})
export class PagoServiciosService {

    public urlEndPoint = `${environment.rutaAPI}`;

  constructor( private http: HttpClient ) { }

  getTsqpagosonline() {
        return this.http.get(this.urlEndPoint + '/tsqpagosonline/').pipe(
      map((response: any) => {
        return response;
        })
    );

  }

  getRecibos() {
    //return this.http.post<Usuarios>(this.urlEndPoint + '/tusuarios/'+login.user+'/'+login.password, login).pipe(
    //return this.http.post(this.urlEndPoint + '/evo/'+evo.session_id+'/'+evo.successIndicator, evo).pipe(
        return this.http.get(this.urlEndPoint + '/tpagosonline/'+sessionStorage.getItem('Login')).pipe(
      map((response: any) => {
        return response;
        })
    );

  }

  create(pagoOnline: TpagosOnline): Observable<TpagosOnline> {
    //const user = sessionStorage.Login;
    return this.http.post<TpagosOnline>(`${environment.rutaAPI + '/tpagosonline'}`, pagoOnline);
  }

}