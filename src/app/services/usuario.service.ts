import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MyserviceService } from "./myservice.service";
@Injectable({
  providedIn: "root",
})
export class RegistroService {
  URL = "https://zaza-app.herokuapp.com/api/usuario/";
  //URL = "http://18.191.197.204:3000/api/usuario/";
  constructor(private http: HttpClient, private cliente: MyserviceService) {}

  registrar(
    nombre: String,
    username: String,
    email: String,
    contrasena: String,
    img: String,
    telefono: String
  ) {
    return this.http
      .post(`${this.URL}registrar`, {
        nombre,
        username,
        email,
        contrasena,
        img,
        telefono,
      })
      .toPromise();
  }
  obtener(username: String) {
    return this.http
      .get(`${this.URL}verificar/username/${username}`)
      .toPromise();
  }

  actualizar(nombre: String, telefono: String, Img: any) {
    return this.http
      .put(`${this.URL}actualizar/${this.cliente.usuario["_id"]}`, {
        nombre,
        telefono,
        Img,
      })
      .toPromise();
  }

  buscar(usuario: String) {
    return this.http.get(`${this.URL}/buscar/${usuario}`).toPromise();
  }

  reset(email: any) {
    return this.http.get(`${this.URL}/resetpass/${email}`).toPromise();
  }

  carrito(cantidad: number, precio: number, negocio: String, producto: String) {
    return this.http
      .put(`${this.URL}carrito/${this.cliente.usuario["_id"]}`, {
        cantidad: cantidad,
        precio: precio,
        negocio: negocio,
        producto: producto,
      })
      .toPromise();
  }
  actualizarUsuario() {
    return this.http
      .get(`${this.URL}actualizarUsuario/${this.cliente.usuario["_id"]}`)
      .toPromise();
  }
  eliminarCarrito(id: String) {
    return this.http
      .put(`${this.URL}eliminarCarrito/${this.cliente.usuario["_id"]}`, {
        idCarrito: id,
      })
      .toPromise();
  }
}
