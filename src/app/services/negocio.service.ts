import { Injectable } from '@angular/core';
import {HttpClient,  HttpHeaders,} from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError,map, retry} from 'rxjs/operators';
import {Store} from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  URL='http://localhost:3000/api/obtenerCategorias';
  URL2='http://localhost:3000/api/obtenerNegocios';
  URL3='http://localhost:3000/api/registrarNegocio';
  
  constructor(public http: HttpClient) { }
   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //Registrar un nuevo negocio
  createItem(item): Observable<Store> {
    return this.http
      .post<Store>(this.URL3, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2)
        
      )
  }
  obtenerCategorias() {
    return this.http.get(this.URL);
  }
  obtenerNegocios() {
    return this.http.get(this.URL2);
  }
}

