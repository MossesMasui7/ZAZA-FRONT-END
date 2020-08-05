import { Component, OnInit } from "@angular/core";
import { NegocioService } from "../../services/negocio.service";
import { RegistroService } from "../../services/usuario.service";
import { MyserviceService } from "../../services/myservice.service";

import { ProductoService } from "../../services/producto.service";
@Component({
  selector: "app-comparador-tienda",
  templateUrl: "./comparador-tienda.page.html",
  styleUrls: ["./comparador-tienda.page.scss"],
})
export class ComparadorTiendaPage implements OnInit {
  productosPrecio: any[] = [];
  negocio: any[] = [];
  constructor(
    public negocios: NegocioService,
    private usuarioService: RegistroService,
    private usuario: MyserviceService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.negociosCarrito();
  }

  onChange($event) {
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
            } else {
              producto.push({
                Producto: carrito["producto"]["descripcion"],
                Precio: "--",
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
