import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { BuscadorComponent } from "../buscador/buscador.component";
import { RegistroService } from "../../services/usuario.service";
import { ToastController } from "@ionic/angular";
import { MyserviceService } from "src/app/services/myservice.service";
@Component({
  selector: "app-tiendas-cercanas",
  templateUrl: "./tiendas-cercanas.component.html",
  styleUrls: ["./tiendas-cercanas.component.scss"],
})
export class TiendasCercanasComponent implements OnInit {
  public cantidad: number = 1;
  constructor(
    public producto: ProductoService,
    public buscador: BuscadorComponent,
    public usuario: RegistroService,
    public toastController: ToastController,
    public cliente: MyserviceService
  ) {}

  ngOnInit() {
    this.producto.tiendas["tiendas"].forEach((element) => {
      let tienda = {};
      if (element["alcance"] != false) {
        tienda["nombre"] = element["negocio"]["nombre"];
        tienda["precio"] = element.precio;
        this.producto.precio.push(tienda);
      }
    });
  }
  more() {
    this.cantidad++;
  }
  less() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  dis() {
    this.buscador.SortDis();
  }
  pre() {}
  seleccionar(i: Number) {
    this.usuario
      .carrito(
        this.cantidad,
        this.producto.tiendas["tiendas"][i]["precio"],
        this.producto.tiendas["tiendas"][i]["negocio"]["_id"],
        this.producto.tiendas["_id"]
      )
      .then((data) => {
        this.usuario
          .actualizarUsuario()
          .then((data) => (this.cliente.usuario = data["resp"]));
        this.presentToast();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChange($event) {
    switch ($event.detail.value) {
      case "Precio":
        this.buscador.SortPre();
        break;
      case "Distancia":
        this.buscador.SortDis();
        break;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Se agrego su producto al carrito de compras",
      duration: 2000,
    });
    toast.present();
  }
}
