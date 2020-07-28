import { Component, OnInit } from '@angular/core';
import { PagoServiciosService } from '../../services/dashboard/pagoServicios/pagoservicios.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  recibos: any;
  constructor( private _ps: PagoServiciosService ) { }

  ngOnInit() {


    this._ps.getRecibos().subscribe(
      (recibos) => {
        this.recibos = recibos
        console.log(recibos);
      }
    )

  }

  printInvoice(id) {
    this._ps.printReceipt(id).subscribe((response) => {
  
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

}
