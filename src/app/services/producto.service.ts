import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ProductoService {
  //URL_API = 'http://localhost:3000/api/producto';
  URL_API = "http://192.168.1.79:3000/api/producto";
  public precio = [];
  public tiendas = {};
  public productos: any[] = [];
  constructor(private http: HttpClient) {}

  // aqui es donde manda a llamar al back
  postproducto(pro): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.URL_API}/registrar`, pro).subscribe(
        (res) => {
          console.log("respuesta", res);
          resolve();
        },
        (err) => {
          console.log("error", err);
          reject();
        }
      );
    });
  }

  obtenerCDB(cdb: any) {
    return this.http.get(`${this.URL_API}/verificar/cdb/${cdb}`).toPromise();
  }

  obtener(cdb: any) {
    return this.http.get(`${this.URL_API}/obtener/${cdb}`).toPromise();
  }
  actualizar(id, nombre, marca, modelo, descripcion, img) {
    return this.http
      .put(`${this.URL_API}/actualizarProducto/${id}`, {
        nombre,
        marca,
        modelo,
        descripcion,
        img,
      })
      .toPromise();
  }
}
