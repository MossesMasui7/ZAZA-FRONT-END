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
  negociosCercanos: any;
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
    this.obtenerNegociosCercanos();
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
  doRefresh(event) {
    this.obtenerNegociosCercanos();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  rad(x) {
    return (x * Math.PI) / 180;
  }
  getKilometros = function (lat2, lon2) {
    var R = 6378.137; //Radio de la tierra en km
    var dLat = this.rad(lat2 - this.usuario.la);
    var dLong = this.rad(lon2 - this.usuario.lo);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.usuario.la)) *
        Math.cos(this.rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3); //Retorna tres decimales
  };

  obtenerNegociosCercanos() {
    let tiendasCercanas: any[] = [];
    this.negocios.obtenerNegocios().subscribe((data) => {
      this.negociosCercanos = data;
      this.negociosCercanos.forEach((element) => {
        if (
          parseFloat(
            this.getKilometros(
              element["cordenadas"]["longitude"],
              element["cordenadas"]["latitude"]
            )
          ) < 0.201
        ) {
          tiendasCercanas.push(element);
        }
      });
      this.negociosCercanos = tiendasCercanas;
    });
  }
}
