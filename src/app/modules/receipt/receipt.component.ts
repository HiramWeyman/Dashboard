import { Component, OnInit } from '@angular/core';
import { EvoService } from '../../services/dashboard/evo.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  constructor( private _evo: EvoService ) { }

  ngOnInit() {

    /*
    this._evo.getEvo('10','100').subscribe(
      (variables) => {
        console.log(variables);
      }
    )
    */
  }

}
