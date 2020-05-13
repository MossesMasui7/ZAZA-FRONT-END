import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
URL = "http://192.168.1.75:3000/api/usuario/"
  constructor(private http: HttpClient) { }

  registrar(username:String,email:String,contraseña:String,img:String){
    return this.http.post(`${this.URL}registrar`,{username,email,contraseña,img}).toPromise();
  }
  obtener(username:String){
    return this.http.get(`${this.URL}verificar/username/${username}`).toPromise(); 
  }
}
