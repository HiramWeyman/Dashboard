import { Component, OnInit } from '@angular/core';
import { EvoService } from '../../services/dashboard/evo.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  ecomServices: any[];

  session_id:string;
  successIndicator:string;

  constructor( private _evo: EvoService ) { }

  ngOnInit() {

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
    this._evo.getEvo('10',Mount).subscribe(
      (variables) => {
        this.session_id = variables.session_id;
        this.successIndicator = variables.successIndicator;
        console.log(variables);
      }
    )
  }


}
