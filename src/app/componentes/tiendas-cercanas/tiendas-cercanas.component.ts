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
  public vacio: boolean;

  ngOnInit() {
    this.producto.tiendas["tiendas"].forEach((element) => {
      let tienda = {};
      if (element["alcance"] == true) {
        tienda["nombre"] = element["negocio"]["nombre"];
        tienda["precio"] = element.precio;
        tienda["distancia"] = element.distancia;
        tienda["inventario"] = element.inventario;
        this.producto.precio.push(tienda);
      }
    });
    if (this.producto.precio.length == 0) {
      this.vacio = true;
    } else {
      this.vacio = false;
    }
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
    let disponible: Boolean = true;
    this.cliente.usuario["carrito"].forEach((element) => {
      if (element["producto"]["_id"] == this.producto.tiendas["_id"]) {
        disponible = false;
      }
    });
    if (disponible) {
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
          this.presentToast("Se agrego el artuculo a su carrito");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.presentToast("Este producto ya esta en su carrito");
    }
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

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
    });
    toast.present();
  }
}
