import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor( public router: Router ) { }

  ngOnInit() { 

    if (sessionStorage.getItem('Login') != null) {
      console.log("si entra");
    }else{
      console.log("no deberia de entrar");
      this.router.navigate(['']);
    }

  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
