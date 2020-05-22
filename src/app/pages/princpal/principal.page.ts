import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { MyserviceService } from 'src/app/services/myservice.service';
import {Geolocation,Geoposition} from '@ionic-native/geolocation/ngx'
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(public router:Router,public geolocation:Geolocation,public producto :ProductoService,public usuario:MyserviceService) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((data: Geoposition)=>{
      this.usuario.la = data.coords.latitude
      this.usuario.lo = data.coords.longitude
      
    }).catch((err)=>{
      console.error(err);
    })
 
  }


  actualizarUsuario(){
    this.router.navigate(['./actualizar-usuario']); 
  }

  alta(){
    this.router.navigate(['./alta-producto']); 

  }
}
