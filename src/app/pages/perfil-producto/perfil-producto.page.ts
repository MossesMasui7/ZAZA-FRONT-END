import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-perfil-producto',
  templateUrl: './perfil-producto.page.html',
  styleUrls: ['./perfil-producto.page.scss'],
})
export class PerfilProductoPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  Update(){
    this.router.navigateByUrl('actualizar-producto');
  }
}
