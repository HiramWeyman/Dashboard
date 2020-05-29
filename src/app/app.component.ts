import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  constructor(  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('Login') != null) {
      console.log("si entra");
    }else{
      console.log("no deberia de entrar");
    }
  }

}
