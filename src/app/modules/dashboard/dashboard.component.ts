import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrarService } from '../../services/registrar.service';
import { Usuarios } from '../../shared/registrar/usuarios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuarios:Usuarios[];

  constructor( private _reg: RegistrarService) { }

  ngOnInit() {
    window.scroll(0, 0);

    this._reg.getUserName(sessionStorage.getItem('Login')).subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        //console.log(this.usuarios);
      }
    )

  }

}
