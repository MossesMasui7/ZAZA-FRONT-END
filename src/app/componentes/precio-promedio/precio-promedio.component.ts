import { Component, OnInit } from '@angular/core';
import { ProductoService} from '../../services/producto.service'
@Component({
  selector: 'app-precio-promedio',
  templateUrl: './precio-promedio.component.html',
  styleUrls: ['./precio-promedio.component.scss'],
})
export class PrecioPromedioComponent implements OnInit {
public suma = 0
public precios = []
public promedio = 0
public min = 0
public contador = 0
  constructor(public producto:ProductoService) { }

  ngOnInit() {
  this.producto.tiendas.tiendas.forEach(element => {
    if (element['alcance'] != false) {
      this.suma += element.Precio;
      this.precios.push(element.Precio)
      this.contador++
    }
  
  });
 this.promedio = this.suma / this.contador
this.min = Math.min.apply(null,this.precios)


  }

}
