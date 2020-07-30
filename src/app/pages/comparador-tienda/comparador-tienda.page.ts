import { Component, OnInit } from '@angular/core';
import { NegocioService } from "../../services/negocio.service";
import { RegistroService } from "../../services/usuario.service";
import { MyserviceService } from "../../services/myservice.service";

import { Console } from 'console';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'app-comparador-tienda',
  templateUrl: './comparador-tienda.page.html',
  styleUrls: ['./comparador-tienda.page.scss'],
})
export class ComparadorTiendaPage implements OnInit {
  negociosCercanos: any;
  mostrarCarrito = true;
  mostrarVacio = false;
  public data;
  idNegocio: String;
  idNegocio2: String;
  productosPrecio:any[] =[]
  negocio: any[]=[]
  constructor( public negocios: NegocioService,private usuarioService: RegistroService,
    private usuario: MyserviceService, private productoService: ProductoService) { }

  ngOnInit() {
    this.negociosCarrito()
    this.negocios.obtenerNegocios().subscribe((data) => {
      this.negociosCercanos = data;
    });
    if (this.usuario.usuario["carrito"].length > 0) {
      this.mostrarCarrito = true;
      
      this.mostrarVacio = false;
    } else {
      this.mostrarCarrito = false;
      this.mostrarVacio = true;
    }
  
  } 

  // precio1(idNegocio){
  //   this.productoService.buscarprecio().subscribe(data => {
      
  //   })


  // }

onChange($event){
  let producto = []
  producto = []
  this.productoService.buscarprecio($event.target.value).then((data)=>{
    data['resp'].forEach(db => {
      this.usuario.usuario['carrito'].forEach(carrito => {
        if (db['Producto'] == carrito['producto']['_id']) {
          producto.push({
            "Producto":carrito['producto']['descripcion'],
            "Precio": db['Precio']
          })
         
          
        }else{
          producto.push({
            "Producto":carrito['producto']['descripcion'],
            "Precio": '--'
          })
        }
      });
    });
    this.productosPrecio = producto
   
    
  }).catch((err)=>{
    console.log(err);
    
  })
}

  negociosCarrito(){
let negocios =[]
    this.usuario.usuario['carrito'].forEach(element => {
      
      negocios.push({
        'nombre':element['negocio']['nombre'],
        '_id':element['negocio']['_id']
      })
      
      
    });

    this.negocio = negocios

    
    
  }


 
 

}
