import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Tvusuario } from './tvusuario';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuariosService {

    public urlEndPoint = `${environment.rutaAPI}`;

  constructor( private http: HttpClient ) { }

  getListaUsuarios() {
    console.log("entra");
    
        return this.http.get(this.urlEndPoint + '/tvusuarios/').pipe(
      map((response: any) => {
        return response;
        })
    );

  }

}