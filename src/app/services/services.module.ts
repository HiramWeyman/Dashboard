import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { RegistrarService } from './registrar.service';
import { ValidadoresService } from './validadores.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    RegistrarService,
    ValidadoresService,
  ]
})
export class ServicesModule { }
