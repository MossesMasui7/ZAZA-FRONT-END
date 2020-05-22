import { Component, OnInit } from '@angular/core';
import {RegistroService} from '../services/usuario.service'
  import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  public email:string = "";
  constructor(public usuario:RegistroService,public router:Router) { }

  ngOnInit() {
  }

  sendLinkReset(email:any){
    this.usuario.reset(email).then((resp)=>{
      console.log(resp)
      alert('Enviando')
      this.router.navigate(['/login'])
    }).catch((err)=>{
      console.error(err);
      
    })
  }

 

}
