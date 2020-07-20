import { Component, OnInit } from '@angular/core';
import { NegocioService } from "../../services/negocio.service";
import { RegistroService } from "../../services/usuario.service";
import { MyserviceService } from "../../services/myservice.service";
@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.page.html',
  styleUrls: ['./comparador.page.scss'],
})
export class ComparadorPage implements OnInit {
  negociosCercanos: any;
  mostrarCarrito = true;
  mostrarVacio = false;
  public data;
  idNegocio: String;
  idNegocio2: String;
  constructor(public negocios: NegocioService,private usuarioService: RegistroService,
    private usuario: MyserviceService) { }

  ngOnInit() {
    if (this.usuario.usuario["carrito"].length > 0) {
      this.mostrarCarrito = true;
      this.mostrarVacio = false;
    } else {
      this.mostrarCarrito = false;
      this.mostrarVacio = true;
    }
  }

  eliminar(id: String) {
    this.usuarioService.eliminarCarrito(id).then((data) => {
      this.usuario.usuario = data["cont"];
    });
  }
}
