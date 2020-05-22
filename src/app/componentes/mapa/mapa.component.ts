import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Geolocation,Geoposition} from '@ionic-native/geolocation/ngx'
import {ProductoService} from '../../services/producto.service'
import {MyserviceService} from '../../services/myservice.service'
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  private map;
  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
 iconoBase = L.Icon.extend({
		options: {
			iconSize:     [25, 25],
			iconAnchor:   [10, 10],
			popupAnchor:  [5, 5]
		}
	});
	tienda = new this.iconoBase({iconUrl: '../../../assets/iconos/pinStore.png'})
	tu = new this.iconoBase({iconUrl: '../../../assets/iconos/pin.ico'})

  constructor(public geolocation:Geolocation,public producto :ProductoService,public usuario:MyserviceService) { }

  ngOnInit() {
      this.marcar() 
  }

  marcar(){
    this.map = L.map('map', {
      center: [ this.usuario.la,this.usuario.lo ],
      zoom: 16
    });
    L.marker([this.usuario.la, this.usuario.lo],{icon:this.tu}).addTo(this.map)
    .bindPopup('Tu estas Aqui')
    .openPopup();
    this.tiles.addTo(this.map);
    this.producto.tiendas.tiendas.forEach(element => {
      if (element['alcance'] != false) {
        L.marker([element.ubicacion.longitude,element.ubicacion.latitude],{icon:this.tienda}).addTo(this.map)
        .bindPopup(`${element.Nombre} </br> $${element.Precio}.00 </br> ${element['distancia']}Kms`)
        .openPopup();
        L.polyline([[this.usuario.la, this.usuario.lo], [element.ubicacion.longitude,element.ubicacion.latitude]], {
          color: 'red'
        }).addTo(this.map);
      }
     
    });
  
    
  }
  

}