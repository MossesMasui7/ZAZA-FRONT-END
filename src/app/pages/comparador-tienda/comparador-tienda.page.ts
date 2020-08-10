import { Component, OnInit } from "@angular/core";
import { NegocioService } from "../../services/negocio.service";
import { RegistroService } from "../../services/usuario.service";
import { MyserviceService } from "../../services/myservice.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

import { ProductoService } from "../../services/producto.service";
@Component({
  selector: "app-comparador-tienda",
  templateUrl: "./comparador-tienda.page.html",
  styleUrls: ["./comparador-tienda.page.scss"],
})
export class ComparadorTiendaPage implements OnInit {
  productosPrecio: any[] = [];
  productosPrecio1: any[] = [];
  negocio: any[] = [];
  total1: number = 0;
  total2: number = 0;
  constructor(
    private screenOrientation: ScreenOrientation,
    public negocios: NegocioService,
    private usuarioService: RegistroService,
    private usuario: MyserviceService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.negociosCarrito();
    this.select(this.negocio[0]["_id"]);
  }
  ionViewDidLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  segunda(precio, i) {
    if (
      document.getElementById("p" + i).style.background == "" &&
      precio != "--"
    ) {
      document.getElementById("p" + i).style.background = "#8df17f";

      this.total2 = this.total2 + precio;
    } else {
      document.getElementById("p" + i).style.background = "";
      this.total2 = this.total2 - precio;
    }
  }

  primera(precio, i) {
    if (
      document.getElementById("pr" + i).style.background == "" &&
      precio != "--"
    ) {
      document.getElementById("pr" + i).style.background = "#8df17f";
      this.total1 = this.total1 + precio;
    } else {
      document.getElementById("pr" + i).style.background = "";
      this.total1 = this.total1 - precio;
    }
  }

  select(id) {
    let producto = [];
    producto = [];
    this.productoService
      .buscarprecio(id)
      .then((data) => {
        data["resp"].forEach((db) => {
          this.usuario.usuario["carrito"].forEach((carrito) => {
            if (db["Producto"] == carrito["producto"]["_id"]) {
              producto.push({
                Producto: carrito["producto"]["descripcion"],
                Precio: db["Precio"],
              });
            }
          });
        });

        this.productosPrecio = producto;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.productosPrecio);
    producto = [];
  }

  onChange($event) {
    this.select($event.target.value);
  }

  onChange1($event) {
    let producto = [];
    producto = [];
    this.productoService
      .buscarprecio($event.target.value)
      .then((data) => {
        data["resp"].forEach((db) => {
          this.usuario.usuario["carrito"].forEach((carrito) => {
            if (db["Producto"] == carrito["producto"]["_id"]) {
              producto.push({
                Producto: carrito["producto"]["descripcion"],
                Precio: db["Precio"],
              });
            }
          });
        });

        this.productosPrecio1 = producto;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.productosPrecio);
    producto = [];
  }

  negociosCarrito() {
    let negocios = [];
    this.usuario.usuario["carrito"].forEach((element) => {
      negocios.push({
        nombre: element["negocio"]["nombre"],
        _id: element["negocio"]["_id"],
      });
    });

    for (let i = 0; i < negocios.length; i++) {
      let neg = negocios[i]["_id"];
      for (let index = 0; index < negocios.length; index++) {
        if (neg == negocios[index]["_id"] && i != index) {
          negocios.splice(index, 1);
        }
      }
    }

    this.negocio = negocios;
  }
}
