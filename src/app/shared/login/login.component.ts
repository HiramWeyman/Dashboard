import { Component, OnInit, ɵEMPTY_ARRAY } from '@angular/core';
import { Login } from './login';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoginService } from '../../services/login.service';
import { isNullOrUndefined, isUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  public log: Login = new Login();

  constructor( private router: Router, private _log: LoginService ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
		if (this.subscription !== undefined) {
			this.subscription.unsubscribe();
		}
  }
  
  login() {
    this.subscription = this._log.getLogin(this.log)
      .subscribe((data: any) => {
        console.log(data);
        
        if ( typeof data !== 'undefined' && data.length > 0) {
          swal.fire({
            icon: 'success',
            title: 'Usuario Logeado',
            text: 'Bienvenido ' + data[0].usua_nombre,
            timer: 2000
          });
          sessionStorage.Login = this.log.user.toString();
          this.router.navigate(['/dashboard']);
        } else{
          swal.fire({
            icon: 'error',
            title: 'Usuario y/o contraseña incorrecta'
          });
        }	
      },
      error => {
        //console.log(error.error.Message);
        swal.fire({
          title: 'ERROR!!!',
          text: error.error.Message,
          icon: 'error'});
      });
    }

}
