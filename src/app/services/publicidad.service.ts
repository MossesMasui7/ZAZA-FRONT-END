import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PublicidadService {
  public url: String = "https://zaza-app.herokuapp.com/api/";
  //public url: String = "http://18.191.197.204:3000/api/";
  constructor(public http: HttpClient) {}

  registrar(idNegocio: any, datos: any) {
    return this.http
      .post(`${this.url}publicidad/registrar/${idNegocio}`, datos)
      .toPromise();
  }
}
