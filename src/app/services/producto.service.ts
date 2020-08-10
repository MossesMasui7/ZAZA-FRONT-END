import { MyserviceService } from "src/app/services/myservice.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ProductoService {
  URL_API = "https://zaza-app.herokuapp.com/api/producto";
  //URL_API = "http://18.191.197.204:3000/api/producto";
  public precio: any[];
  public tiendas = {};
  public productos: any[] = [];
  public cdb: any = "";

  constructor(private http: HttpClient, public usuario: MyserviceService) {}

  // aqui es donde manda a llamar al back
  postproducto(pro): Promise<any> {
    return this.http.post(`${this.URL_API}/registrar`, pro).toPromise();
  }

  obtenerCDB(cdb: any) {
    return this.http.get(`${this.URL_API}/verificar/cdb/${cdb}`).toPromise();
  }

  obtener(cdb: any) {
    return this.http.get(`${this.URL_API}/obtener/${cdb}`).toPromise();
  }
  actualizar(id, descripcion, img) {
    return this.http
      .put(`${this.URL_API}/actualizarProducto/${id}`, {
        descripcion,
        img,
      })
      .toPromise();
  }

  agregarNegocio(idNegocio, negocio) {
    return this.http
      .put(`${this.URL_API}/add/negocio/${idNegocio}`, negocio)
      .toPromise();
  }
  agregarComentario(
    id: any,
    _idUsuario: String,
    username: String,
    texto: String,
    fecha: Date
  ) {
    return this.http
      .put(`${this.URL_API}agregarComentario/${id}`, {
        _idUsuario,
        username,
        texto,
        fecha,
      })
      .toPromise();
  }
  buscarprecio(idNegocio) {
    return this.http
      .get(
        `${this.URL_API}/comparar/${this.usuario.usuario["_id"]}/${idNegocio}`
      )
      .toPromise();
  }
}
