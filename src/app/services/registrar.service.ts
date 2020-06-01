import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, } from '../../environments/environment';
import { Ttipouser } from '../shared/registrar/ttipouser';
import { Tnivelures } from '../shared/registrar/tnivelures';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor( private http: HttpClient ) { }

  getTtipouser(): Observable<Ttipouser[]> {
    return this.http.get(`${environment.rutaAPI}` + '/ttipouser').pipe(
      map(response => response as Ttipouser[])
    );
  }

  getTnivelures(): Observable<Tnivelures[]> {
    return this.http.get(`${environment.rutaAPI}` + '/tnivelures').pipe(
      map(response => response as Tnivelures[])
    );
  }

}
