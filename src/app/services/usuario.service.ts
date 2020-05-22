import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
URL = "http://localhost:3000/api/usuario/"
  constructor(private http: HttpClient) { }

  registrar(nombre:String,username:String,email:String,contraseña:String,img:String,telefono:String){
    return this.http.post(`${this.URL}registrar`,{nombre,username,email,contraseña,img,telefono}).toPromise();
  }
  obtener(username:String){
    return this.http.get(`${this.URL}verificar/username/${username}`).toPromise(); 
  }

  actualizar(nombre:String,contraseña:String,telefono:String){
    return this.http.post(`${this.URL}actualizar/5ebc3daf8c9a721a906c92c4`,{nombre,contraseña,telefono}).toPromise();
  }

}
