import { MyserviceService } from 'src/app/services/myservice.service';
import {RegistroService} from '../../services/usuario.service'
import { Component, OnInit, Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'
import {ProductoService} from '../../services/producto.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
codigo:any = ""
vacio:boolean = false
resultado:boolean = false
productos:any[] = []
  constructor(public usuario:MyserviceService,public usuarios:RegistroService,private barcodeScanner: BarcodeScanner,public producto:ProductoService,public router:Router) { }

  ngOnInit() {

    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((texto)=>{
      if (texto) {
        this.vacio = true
        

        if (texto.startsWith("@")) {
          let usuario = texto.substring(1)
          this.usuarios.buscar(usuario).then((data)=>{
            console.log(data);
          }).catch((err)=>{
            console.log("Usuario no existe")
            
          })
          
        }

        this.producto.obtener(texto).then((prod)=>{
          if (prod['resp'].length > 1) {
            this.producto.productos = prod['resp']
            this.resultado = false
           // console.log(this.producto.productos);
          }else{
          this.producto.tiendas = prod['resp']['0']
          this.SortPre()
          this.producto.precio = []
         // console.log(this.producto.tiendas);
          this.router.navigate(['./buscar']); 
          }
        }).catch((err)=>{
          this.resultado = true
          this.producto.productos = []
        })
      }else{
        this.vacio = false
        this.producto.productos = []
      }
    })
  }
  search:any = new FormControl('')
escanear(){
this.barcodeScanner.scan().then(barcodeData => {

 this.search = barcodeData.text
 this.producto.obtenerCDB(this.search).then((prod)=>{
  this.producto.tiendas = prod['resp']['0']
  //this.SortDis()
  this.SortPre()
  this.producto.precio = []
  this.router.navigate(['./buscar']); 
}).catch((err)=>{
  console.error(err); 
})

}).catch(err => {
    console.log('Error', err);
});
}


rad(x) {return x*Math.PI/180;}
getKilometros = function(lat2,lon2){
var R = 6378.137; //Radio de la tierra en km
var dLat = this.rad( lat2 - this.usuario.la);
var dLong = this.rad( lon2 - this.usuario.lo  );
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.rad(this.usuario.la)) * Math.cos(this.rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;

return d.toFixed(3); //Retorna tres decimales
}
GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}    
SortPre() {
  for (let i=0; i<this.producto.tiendas.tiendas.length; i++){
    if(parseFloat(this.getKilometros(this.producto.tiendas.tiendas[i].ubicacion.longitude,this.producto.tiendas.tiendas[i].ubicacion.latitude))<= 15){     
      this.productos.push(this.producto.tiendas.tiendas[i])
      this.productos[i]['distancia'] = this.getKilometros(this.producto.tiendas.tiendas[i].ubicacion.longitude,this.producto.tiendas.tiendas[i].ubicacion.latitude)
      this.productos.sort(this.GetSortOrder("Precio"))
    }else{
      this.productos.push(this.producto.tiendas.tiendas[i])
      this.productos[i]['alcance'] = false
    }
  }
  this.producto.tiendas.tiendas = this.productos
  this.productos = []
}

SortDis() {
  for (let i=0; i<this.producto.tiendas.tiendas.length; i++){
    if(parseFloat(this.getKilometros(this.producto.tiendas.tiendas[i].ubicacion.longitude,this.producto.tiendas.tiendas[i].ubicacion.latitude))<= 15){
       this.productos.push(this.producto.tiendas.tiendas[i])
       this.productos[i]['distancia'] = this.getKilometros(this.producto.tiendas.tiendas[i].ubicacion.longitude,this.producto.tiendas.tiendas[i].ubicacion.latitude)
       this.productos.sort(this.GetSortOrder("distancia"))
    }else{
      this.productos.push(this.producto.tiendas.tiendas[i])
      this.productos[i]['distancia'] = this.getKilometros(this.producto.tiendas.tiendas[i].ubicacion.longitude,this.producto.tiendas.tiendas[i].ubicacion.latitude)
      this.productos[i]['alcance'] = false
    }
  }
  this.producto.tiendas.tiendas = this.productos
  this.productos = []
}

seleccionar(indice:any){
  this.producto.tiendas = this.producto.productos[indice];
          this.SortPre()
          this.producto.precio = []
          //console.log(this.producto.tiendas);
          this.alerta()
          
}


addProducto(){
  this.router.navigate(["alta-producto"])
}

alerta(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Seleccione la opcion',
    text: "Desea Comparar el producto ó ver perfil de producto",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Comparar',
    cancelButtonText: 'Ver perfil',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.router.navigate(["buscar"])

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      this.router.navigate(["perfil-producto"])

    }
  })
}
}
