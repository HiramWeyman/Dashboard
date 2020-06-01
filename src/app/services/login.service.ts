import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( public router: Router ) { }

  logout() {
		sessionStorage.removeItem('Login');
		// sessionStorage.removeItem(_TOKEN);
		this.router.navigate(['/']);
	}
}
