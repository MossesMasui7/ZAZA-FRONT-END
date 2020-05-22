import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service'
import {BuscadorComponent} from '../buscador/buscador.component'
@Component({
  selector: 'app-tiendas-cercanas',
  templateUrl: './tiendas-cercanas.component.html',
  styleUrls: ['./tiendas-cercanas.component.scss'],
})
export class TiendasCercanasComponent implements OnInit {

  constructor(public producto: ProductoService,public buscador:BuscadorComponent) { }

  ngOnInit() {
    this.producto.tiendas.tiendas.forEach(element => {
      let tienda = {
      
      }
      if (element['alcance']!=false) {
      tienda['nombre'] = element.Nombre
      tienda['precio'] = element.Precio 
      this.producto.precio.push(tienda)
      }
    });

  }
onChange($event){
if ($event.target.value == 1) {
  this.buscador.SortDis()
}else if($event.target.value == 2){
  this.buscador.SortPre()

}

}






}
