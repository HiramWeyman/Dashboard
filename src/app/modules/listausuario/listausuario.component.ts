import { Component, OnInit } from '@angular/core';
import { ListaUsuariosService } from '../../services/dashboard/listausuarios/listausuarios.service';
import { Subscription } from 'rxjs';
import { Tvusuario } from '../../services/dashboard/listausuarios/tvusuario';

@Component({
  selector: 'app-listausuario',
  templateUrl: './listausuario.component.html',
  styleUrls: ['./listausuario.component.scss']
})
export class ListausuarioComponent implements OnInit {

  private subscription: Subscription;
  tvusuario: Tvusuario[];

  constructor( private _lu: ListaUsuariosService ) { }

  ngOnInit() {

    this.subscription = this._lu.getListaUsuarios().subscribe(
      (tvusuario) => {
        this.tvusuario = tvusuario;
      }
    )

  }

}
