import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class MyserviceService {
  URL_API = "http://localhost:3000/api/";
  //URL_API = 'http://192.168.1.79:3000/api/';
  public la: any = 0;
  public lo: any = 0;
  public usuario: any;
  constructor(private http: HttpClient) {}
  // aqui es donde manda a llamar al back
  postUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.URL_API}login`, user).subscribe(
        (res) => {
          this.usuario = res["usuario"];
          resolve();
        },
        (err) => {
          console.log("error", err);
          reject();
        }
      );
    });
  }
  postCon(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.URL_API}actualizar/${user}`, user).subscribe(
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
}
