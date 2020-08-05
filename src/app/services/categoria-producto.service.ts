import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CategoriaProductoService {
  //public url: string = "https://zaza-app.herokuapp.com/api/categoriaProducto/";
  public url: string = "http://18.191.197.204:3000/api/categoriaProducto/";

  constructor(public http: HttpClient) {}

  obtenerCategoria() {
    return this.http.get(`${this.url}obtener`).toPromise();
  }
  obtenerSubCategoria(categoria: string) {
    return this.http.get(`${this.url}obtener/${categoria}`).toPromise();
  }
  obtenerProductosCategoria(subcategoria: any) {
    return this.http
      .get(`${this.url}obtener/productos/${subcategoria}`)
      .toPromise();
  }
}
