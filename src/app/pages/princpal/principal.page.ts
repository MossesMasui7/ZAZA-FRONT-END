import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  actualizarUsuario(){
    this.router.navigate(['./actualizar-usuario']); 
  }
  alta(){
    this.router.navigate(['./alta-producto']); 

  }
}
