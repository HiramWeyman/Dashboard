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

  constructor( private _cp: CatalogoPagoService, private fb: FormBuilder ) { }

  ngOnInit() {

    //sessionStorage.removeItem("shoppingCart");

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
    var array = new Array();
    if (sessionStorage .getItem('shoppingCart') === null) {
      array = [];
      array.push({"ID":this.id_Select,"Mount":this.monto_Select,"Descrip":this.text_Select});
      sessionStorage.setItem('shoppingCart', JSON.stringify(array));
      Swal.fire('Agregado al carrito', `El articulo ${this.text_Select} fue agregado exitosamente`, 'success');
    }else{
      array = JSON.parse(sessionStorage .getItem('shoppingCart'));
      array.push({"ID":this.id_Select,"Mount":this.monto_Select,"Descrip":this.text_Select});
      sessionStorage.setItem('shoppingCart', JSON.stringify(array));
      Swal.fire('Agregado al carrito', `El articulo ${this.text_Select} fue agregado exitosamente`, 'success');
    }
    this.forma.get('servicios').setValue('');
    this.id_Select = "";
    this.text_Select = "";
    this.monto_Select = "";
    this.ToggleButton = true;
  }
}
