import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';   
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  URL_API = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) { }
  // aqui es donde manda a llamar al back 
 postproducto(pro): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.post(this.URL_API, pro ).subscribe(res => {
      console.log('respuesta', res);
      resolve();
    }, err => {
      console.log('error', err);
      reject();
    });
  });
 }
}
