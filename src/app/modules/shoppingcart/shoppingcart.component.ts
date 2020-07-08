import { Component, OnInit } from '@angular/core';
import { EvoService } from '../../services/dashboard/evo.service';

declare const Checkout,showLightbox:any

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  /*
  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = '';
    script.src = "https://evopaymentsmexico.gateway.mastercard.com/checkout/version/51/checkout.js";
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  */

  public cancelCallbackScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "function cancelCallback() {"+
                       " console.log('Payment cancelled');"+
                       " window.location.replace = 'http://localhost:4200/recibos';}";
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public errorCallbackScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "function errorCallback(error) {"+
                       " console.log(JSON.stringify(error));}";
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public completeCallbackScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "function completeCallback(resultIndicator, sessionVersion) {"+
                       " console.log('resultIndicator: ' +resultIndicator);"+
                       " console.log('sessionVersion:' +sessionVersion);"+
                       " window.location.href = 'http://localhost:4200/recibos';}";
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public Checkout() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "Checkout.configure({"+
    	"merchant: 'TEST1125660',"+
        "order: {description: 'Pago de servicios',amount: '100',currency: 'MXN',id: '13'},"+
        "interaction: {merchant: {name: 'UJED',address: {line1: 'Calle Constitución 404, Zona Centro, 34100 Durango, Dgo.'}},"+
            "displayControl : {billingAddress : 'HIDE'},},"+
		    "session: {id:  '"+this.session_id+"'},"+
      "});";
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ecomServices: any[];

  session_id:string;
  successIndicator:string;

  constructor( private _evo: EvoService ) { }

  ngOnInit() {

    //this.loadScript();
    this.cancelCallbackScript();
    this.errorCallbackScript();

    this.ecomServices = JSON.parse(sessionStorage.getItem('shoppingCart'));
    //console.log(this.ecomServices);

  }

  totalPrice() {
    let total = 0;
    for(let data of this.ecomServices){
      total += parseFloat(data.Mount);
    }
    return total;
  }

  deleteItem(ID){
    //console.log(ID);
    var items = JSON.parse(sessionStorage.getItem('shoppingCart'));
    for (var i=0;i<items.length;i++){
      if (items[i].ID == ID){
        items.splice(i,1);
        sessionStorage["shoppingCart"] = JSON.stringify(items);
        this.ecomServices = JSON.parse(sessionStorage.getItem('shoppingCart'));
      }
    }
  }


  Pagar(Mount){
    this._evo.getEvo('11',Mount).subscribe(
      (variables) => {
        this.session_id = variables.session_id;
        this.successIndicator = variables.successIndicator;
        console.log(variables);
        this.Checkout();
        Checkout.showLightbox();
      }
    )
  }


}
