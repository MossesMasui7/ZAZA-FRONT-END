import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Geolocation,Geoposition} from '@ionic-native/geolocation/ngx'
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  private map;
  public la:any = 0
  public lo:any = 0

  

  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  constructor(public geolocation:Geolocation) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((data: Geoposition)=>{
      this.la = data.coords.latitude
      this.lo = data.coords.longitude
         this.map = L.map('map', {
      center: [ this.la,this.lo ],
      zoom: 16
    });
    this.tiles.addTo(this.map);
    L.marker([this.la, this.lo]).addTo(this.map)
    .bindPopup('Tu estas Aqui')
    .openPopup();
    L.marker([21.4299454,-102.5702213]).addTo(this.map)
    .bindPopup('Tienda La Naranja')
    .openPopup();

    L.polyline([[this.la, this.lo], [21.4299454,-102.5702213]], {
      color: 'red'
    }).addTo(this.map);
  
    }).catch((err)=>{
      console.error(err);
    })
 

  }


  
}