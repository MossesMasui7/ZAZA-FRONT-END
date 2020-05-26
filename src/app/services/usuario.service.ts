import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
URL = "http://localhost:3000/api/usuario/"
  constructor(private http: HttpClient) { }

  registrar(nombre:String,username:String,email:String,contrasena:String,img:String,telefono:String){
    return this.http.post(`${this.URL}registrar`,{nombre,username,email,contrasena,img,telefono}).toPromise();
  }
  obtener(username:String){
    return this.http.get(`${this.URL}verificar/username/${username}`).toPromise(); 
  }


  actualizar(nombre:String,contrasena:String,telefono:String){
    return this.http.put(`${this.URL}actualizar/5ec96b36fcbbe72b60ba9da4`,{nombre,contrasena,telefono}).toPromise();
  }

  reset(email:any){
    return this.http.get(`${this.URL}/resetpass/${email}`).toPromise()
  }

}
