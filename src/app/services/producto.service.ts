import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';   
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  URL_API = 'http://localhost:3000/api/producto';

  constructor(private http: HttpClient) { }
  // aqui es donde manda a llamar al back 
 postproducto(pro): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.post(`${this.URL_API}/registrar`, pro ).subscribe(res => {
      console.log('respuesta', res);
      resolve();
    }, err => {
      console.log('error', err);
      reject();
    });
  });
 }
 obtener(cdb:String){
  return this.http.get(`${this.URL_API}/verificar/cdb/${cdb}`).toPromise(); 
}
}
