import { MyserviceService } from "./../../services/myservice.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { NegocioService } from "../../services/negocio.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-agregar-tienda-producto",
  templateUrl: "./agregar-tienda-producto.page.html",
  styleUrls: ["./agregar-tienda-producto.page.scss"],
})
export class AgregarTiendaProductoPage implements OnInit {
  idNegocio: String;
  precio: Number;
  inventario: Number;
  contenido: String;
  elementos: String;
  departamento: String;
  seccion: String;
  productos: String;

  constructor(
    public producto: ProductoService,
    public negocios: NegocioService,
    private router: Router,
    public navCtrl: NavController,
    public usuario: MyserviceService
  ) {}

  ngOnInit() {
    this.negocios.obtenerNegociosCercanos();
  }
  agregarTienda() {
    this.router.navigate(["/registrar-negocio"]);
  }
  swipe() {
    this.navCtrl.pop();
  }
  agregarNegocio() {
    let infNegocio = {
      precio: this.precio,
      inventario: this.inventario,
      negocio: this.idNegocio,
      contenido: this.contenido,
      elementos: this.elementos,
      departamento: this.departamento,
      seccion: this.seccion,
      productos: this.productos,
    };
    this.producto
      .agregarNegocio(this.producto.tiendas["_id"], infNegocio)
      .then((data) => {
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
