import { Component, OnInit } from '@angular/core';
import { CatalogoPagoService } from '../../services/dashboard/catalogoPago.service';
import { CatalogoPago } from '../../services/dashboard/catalogoPago';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  ToggleButton: boolean = true;

  forma: FormGroup;

  catalogopago:CatalogoPago[];
  IDServicio:string;
  Monto:string;
  text_Select:string;
  monto_Select:string;
  id_Select:string;

  array = new Array();
  arrayInit = new Array();

  arrayLength: Number = 0;

  constructor( private _cp: CatalogoPagoService, private fb: FormBuilder ) { }

  ngOnInit() {

    //sessionStorage.removeItem("shoppingCart");

    if(sessionStorage .getItem('shoppingCart')){
      this.arrayInit = JSON.parse(sessionStorage .getItem('shoppingCart'));
      this.arrayLength = this.arrayInit.length;
    }
   

    window.scroll(0, 0);
    this.crearFormulario();

    this._cp.getCatalogoPago(sessionStorage.getItem('Tipo').toString()).subscribe(
      (catalogopago) => {
        this.catalogopago = catalogopago;
        //console.log(catalogopago);
      }
    )

  }

  buttonEnabled(ValorSelect){
    this.ToggleButton = false;
    var splitted = ValorSelect.split(","); 
  }

  textSelect($event) {
    this.text_Select = $event.target.options[$event.target.options.selectedIndex].text;
    var splitted = $event.target.value.split(","); 
    this.id_Select = splitted[0];
    this.monto_Select = splitted[1];
  }


  crearFormulario(){

    this.forma = this.fb.group({
      servicios: ['', Validators.required]
    });
  }

  add(){
    if (sessionStorage .getItem('shoppingCart') === null) {
      this.array = [];
      this.array.push({"ID":this.id_Select,"Mount":this.monto_Select,"Descrip":this.text_Select});
      sessionStorage.setItem('shoppingCart', JSON.stringify(this.array));
      Swal.fire('Agregado al carrito', `El articulo ${this.text_Select} fue agregado exitosamente`, 'success');
    }else{
      this.array = JSON.parse(sessionStorage .getItem('shoppingCart'));
      this.array.push({"ID":this.id_Select,"Mount":this.monto_Select,"Descrip":this.text_Select});
      sessionStorage.setItem('shoppingCart', JSON.stringify(this.array));
      Swal.fire('Agregado al carrito', `El articulo ${this.text_Select} fue agregado exitosamente`, 'success');
    }
    this.arrayLength = this.array.length;
    this.forma.get('servicios').setValue('');
    this.id_Select = "";
    this.text_Select = "";
    this.monto_Select = "";
    this.ToggleButton = true;
  }
}
