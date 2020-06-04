import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
//URL = "http://localhost:3000/api/usuario/"
URL = "http://192.168.1.79:3000/api/usuario/"
  constructor(private http: HttpClient) { }

  registrar(nombre:String,username:String,email:String,contrasena:String,img:String,telefono:String){
    return this.http.post(`${this.URL}registrar`,{nombre,username,email,contrasena,img,telefono}).toPromise();
  }
  obtener(username:String){
    return this.http.get(`${this.URL}verificar/username/${username}`).toPromise(); 
  }


  actualizar(nombre:String,contraseña:String,telefono:String){
    return this.http.post(`${this.URL}actualizar/5ebc3daf8c9a721a906c92c4`,{nombre,contraseña,telefono}).toPromise();
  }

  reset(email:any){
    return this.http.get(`${this.URL}/resetpass/${email}`).toPromise()
  }

}
