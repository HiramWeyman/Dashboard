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

  printInvoice(id,ref_banco,bandera) {
    
    if (bandera==null){
      this._ps.printReceipt(id,ref_banco).subscribe((response) => {
  
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    }else{
      this._ps.printReceiptDsto(id,ref_banco).subscribe((response) => {
  
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    }
  }

}
