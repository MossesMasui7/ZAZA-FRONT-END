import { MyserviceService } from "./myservice.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { Store } from "../models/store";

@Injectable({
  providedIn: "root",
})
export class NegocioService {
  URL = "https://zaza-app.herokuapp.com/api/obtenerCategorias";
  URL2 = "https://zaza-app.herokuapp.com/api/obtenerNegocios";
  URL3 = "https://zaza-app.herokuapp.com/api/registrarNegocio";
  // URL = "http://18.191.197.204:3000/api/obtenerCategorias";
  // URL2 = "http://18.191.197.204:3000/api/obtenerNegocios";
  // URL3 = "http://18.191.197.204:3000/api/registrarNegocio";
  public negociosCercanos: any;

  constructor(public http: HttpClient, public usuario: MyserviceService) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  //Registrar un nuevo negocio
  createItem(item): Observable<Store> {
    return this.http
      .post<Store>(this.URL3, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2));
  }
  obtenerCategorias() {
    return this.http.get(this.URL);
  }
  obtenerNegocios() {
    return this.http.get(this.URL2);
  }
  rad(x) {
    return (x * Math.PI) / 180;
  }
  getKilometros = function (lat2, lon2) {
    var R = 6378.137; //Radio de la tierra en km
    var dLat = this.rad(lat2 - this.usuario.la);
    var dLong = this.rad(lon2 - this.usuario.lo);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.usuario.la)) *
        Math.cos(this.rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3); //Retorna tres decimales
  };

  obtenerNegociosCercanos() {
    let tiendasCercanas: any[] = [];
    this.obtenerNegocios().subscribe((data) => {
      this.negociosCercanos = data;
      this.negociosCercanos.forEach((element) => {
        if (
          parseFloat(
            this.getKilometros(
              element["cordenadas"]["longitude"],
              element["cordenadas"]["latitude"]
            )
          ) < 0.201
        ) {
          tiendasCercanas.push(element);
        }
      });
      this.negociosCercanos = tiendasCercanas;
    });
  }
}
