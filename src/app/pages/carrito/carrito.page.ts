import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { RegistroService } from "../../services/usuario.service";
import { MyserviceService } from "../../services/myservice.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.page.html",
  styleUrls: ["./carrito.page.scss"],
})
export class CarritoPage implements OnInit {
  productos = ["Leche", "Kleenex"];
  mostrarCarrito = true;
  mostrarVacio = false;
  public data;
  constructor(
    private usuarioService: RegistroService,
    private usuario: MyserviceService,
    public router: Router,
    public screenOrientation: ScreenOrientation
  ) {}

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

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
  comparador() {
    this.router.navigate(["comparador-tienda"]);
  }
}
