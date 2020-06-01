import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html'
})
export class RegistrarComponent implements OnInit {

  forma: FormGroup;

  private subscription: Subscription;

  isHidden = true

  constructor( private fb: FormBuilder, private validadores: ValidadoresService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.crearFormulario();
  }

  Hidden(ValorSelect){
    if (ValorSelect=="30"){
      this.isHidden = false;
      this.forma.get('nivelUres').setValue('');
      this.forma.get('nivelUres').setValidators(Validators.required);
      this.forma.get('nivelUres').updateValueAndValidity();
    }else{
      this.forma.get('nivelUres').setValue('');
      this.forma.get('nivelUres').clearValidators();
			this.forma.get('nivelUres').updateValueAndValidity();
      this.isHidden = true;
    }
  }

  get tipoUsuarioNovalido(){
    return this.forma.get('tipoUsuario').invalid && this.forma.get('user').touched
  }

  get nivelUresNovalido(){
    return this.forma.get('nivelUres').invalid && this.forma.get('user').touched
  }

  get userNovalido(){
    return this.forma.get('user').invalid && this.forma.get('user').touched
  }

  get nombreNovalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get telefonoNovalido(){
    return this.forma.get('telefono').invalid && this.forma.get('telefono').touched
  }

  get emailNovalido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  get passwordNovalido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }

  get repasswordNovalido(){
    //return this.forma.get('repassword').invalid && this.forma.get('repassword').touched
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('repassword').value;
    
    return ( pass1 === pass2) ? false : true;
  }

  crearFormulario(){

    this.forma = this.fb.group({
      tipoUsuario: ['', Validators.required],
      nivelUres: ['', Validators.required],
      user: ['', [Validators.required,Validators.maxLength(20)]],
      nombre: ['', [Validators.required,Validators.maxLength(100)]],
      telefono: ['', [Validators.required,Validators.maxLength(10)]],
      email: ['', [Validators.required,Validators.email,Validators.maxLength(50)]],
      password: ['', [Validators.required,Validators.maxLength(50)]],
      repassword: ['', [Validators.required,Validators.maxLength(50)]]
    },{
      validators: this.validadores.passwordsIguales('password','repassword')
    });

  }

  guardar(){
    console.log(this.forma);

    if (this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control =>{
        control.markAsTouched();
      })
    }
    
  }

}
