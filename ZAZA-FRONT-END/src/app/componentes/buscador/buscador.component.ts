import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
codigo:any = ""
  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((data)=>{
      console.log(data)
    })
  }
  search:any = new FormControl('')
escanear(){
this.barcodeScanner.scan().then(barcodeData => {

 this.search = barcodeData.text
}).catch(err => {
    console.log('Error', err);
});
}

}
