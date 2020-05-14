import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL_API = 'http://localhost:5000/usuario';
  
  constructor(private http: HttpClient) {  }
 // aqui es donde manda a llamar al back 
 postUser(user): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.post(this.URL_API, user).subscribe(res => {
      console.log('respuesta', res);
      resolve();
    }, err => {
      console.log('error', err);
      reject();
    });
  });
 }
 
 getUser() {
 
  return this.http.get(this.URL_API).toPromise();
}
 putUser(user): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.put(this.URL_API + user._id, user).subscribe(res => {
      console.log('respuesta', res);
      resolve();
    }, err => {
      console.log('error', err);
      reject();
    })
  })
 }


 deleteUser(_id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.delete(this.URL_API + _id).subscribe(res => {
      console.log('respuesta', res);
      resolve();
    }, err => {
      console.log('error', err);
      reject();
    })
  })
  return;
 }

}
