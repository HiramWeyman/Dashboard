import { Component, OnInit } from '@angular/core';
import { DescuentosService } from '../../services/dashboard/descuentos/descuentos.service'; 
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { PagoServiciosService } from '../../services/dashboard/pagoServicios/pagoservicios.service';
import { Subscription } from 'rxjs';
import { Descuentos } from '../../services/dashboard/descuentos/descuentos';
import {Router, ActivatedRoute} from '@angular/router';
import { EvoService } from '../../services/dashboard/evo.service';
import { Tvdescuentos } from './tvdescuentos';

declare const Checkout,showLightbox:any

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  public Checkout() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "Checkout.configure({"+
    	"merchant: 'TEST1125660',"+
        "order: {description: 'Pago de servicios',amount: '100',currency: 'MXN',id: '"+this.ID+"'},"+
        "interaction: {merchant: {name: 'UJED',address: {line1: 'Calle Constitución 404, Zona Centro, 34100 Durango, Dgo.'}},"+
            "displayControl : {billingAddress : 'HIDE'},},"+
		    "session: {id:  '"+this.session_id+"'},"+
      "});";
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  
  private subscription: Subscription;

  descuentos: Descuentos[];
  descuentosdet: Descuentos[];

  session_id:string;
  successIndicator:string;
  ID:string;

  public items: any = "";

  forma: FormGroup;

  total = 0;

  constructor( private _ds: DescuentosService, private fb: FormBuilder, private _ps: PagoServiciosService,
               public router: Router, private _evo: EvoService ) { }

  ngOnInit() {

    this.subscription = this._ps.getTsqpagosonline()
    .subscribe((data: any) => {
      this.ID = data;
      //console.log(data);
      })	

    window.scroll(0, 0);
    this.crearFormulario();

    this._ds.getDescuento().subscribe(
      (descuentos) => {
        this.descuentos = descuentos
      }
    )

  }

  valuesSelect(values){
    //console.log(values);
    this.forma.get('pago_foldescto').setValue(values);
    
    this._ds.getDescuentoDet().subscribe(
      (descuentosdet) => {
        this.descuentosdet = descuentosdet
        //console.log(descuentosdet);
        this.totalPrice(this.descuentosdet);
      }
    )
  }

  totalPrice(datosdet: any) {
    this.total = 0;
    for(let data of datosdet){
      this.total += parseFloat(data.vdes_a_pagar);
    }
    this.forma.get('pago_montoapagar').setValue(this.total);
    return this.total;
  }

  get conceptoNovalido(){
    return this.forma.get('pago_concepto').invalid && this.forma.get('pago_concepto').touched
  }

  get metodoPagoNovalido(){
    return this.forma.get('metodoPago').invalid && this.forma.get('metodoPago').touched
  }

  getdescuentosNovalido(){
    return this.forma.get('descuentos').invalid && this.forma.get('descuentos').touched
  }

  crearFormulario(){

    this.forma = this.fb.group({
      descuentos: ['', Validators.required],
      pago_concepto: ['', [Validators.required,Validators.maxLength(150)]],
      pago_foldescto: [''],
      pago_referencia: [this.ID],
      pago_montoapagar: [''],
      pago_userid: [sessionStorage.getItem('Login')],
      metodoPago: ['', Validators.required],
      pago_estatus: ['P']
    });
  }

  Pagar(){
    if (this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control =>{
        control.markAsTouched();
      })
    }else{
      console.log(this.forma);
      this._ps.create(this.forma.value).subscribe(master => {
        Swal.fire({icon: 'success',title: 'Datos Guardados',text: 'Se te redireccionara al portal de pago',showConfirmButton: false,timer: 3000});
        sessionStorage.removeItem('shoppingCart');
        this._evo.getEvo(this.ID,master.pago_montoapagar).subscribe(
          (variables) => {
            this.session_id = variables.session_id;
            this.successIndicator = variables.successIndicator;
            this.router.navigate(['dashboard']);
                   
            
            return new Promise(resolve => {
              this.Checkout();
              Checkout.showLightbox();
              resolve(
                sessionStorage.MasterID = master.pago_folpago.toString()
                /*
                this._ps.updateMaster(master.pago_userid).subscribe(res => {
                  console.log(res);
                  
                },
                error => {
                  console.log(error);
                  Swal.fire({
                    title: 'ERROR!!!',
                    text: error.error.message,
                    icon: 'error'});
                })
                */
              );
            })
          }
        )

      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.error.message,
          icon: 'error'});
      })
    }
    
  }
}
