import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { BuscadorComponent } from "../buscador/buscador.component";
@Component({
  selector: "app-tiendas-cercanas",
  templateUrl: "./tiendas-cercanas.component.html",
  styleUrls: ["./tiendas-cercanas.component.scss"],
})
export class TiendasCercanasComponent implements OnInit {
  constructor(
    public producto: ProductoService,
    public buscador: BuscadorComponent
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

  dis() {
    this.buscador.SortDis();
  }
  pre() {
    this.buscador.SortPre();
  }
}
