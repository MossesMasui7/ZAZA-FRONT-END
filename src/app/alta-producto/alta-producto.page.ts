import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../services/producto.service'

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {

  marca :string ;
  modelo :string;
  nombre: string;
  cdb : string;
  precio: string;
  ubicacion: string;
  descripcion: string;
  alias:string

  constructor(private productoService:ProductoService) { } 

  ngOnInit() {
  }

  subir(){
    let pro ={
      marca:this.marca,
      modelo:this.modelo,
      nombre:this.nombre,
      cdb:this.cdb,
      precio:this.precio,
      ubicacion:this.ubicacion,
      descripcion:this.descripcion,
      alias:this.alias
    }
    this.productoService.postproducto(pro).then(data=>{
      this.marca = this.modelo= this.nombre = this.cdb = this.precio= this.ubicacion = this.descripcion =this.alias = "";
      
    })

  }


}
