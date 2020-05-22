import { Component, OnInit } from '@angular/core';
import {RegistroService} from '../../services/usuario.service'
@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.page.html',
  styleUrls: ['./actualizar-usuario.page.scss'],
})
export class ActualizarUsuarioPage implements OnInit {
public nombre:String;
public telefono:String;
public contrasena:String;
public confirmarContrasena:String;
  constructor(public actualizar:RegistroService) { }

  ngOnInit() {
  }
  actualizacion(){
    this.actualizar.actualizar(this.nombre, this.contrasena, this.telefono).then((respuesta)=>{
      console.log(respuesta);
    }).catch((err)=>{
      console.log(err);
    })
  }

}
