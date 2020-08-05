import { CategoriaProductoService } from "./../../../../services/categoria-producto.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: "app-productos",
  templateUrl: "./productos.page.html",
  styleUrls: ["./productos.page.scss"],
})
export class ProductosPage implements OnInit {
  constructor(
    public rutaActiva: ActivatedRoute,
    public productosService: CategoriaProductoService
  ) {}
  public paramsSubCategoria: string;
  public productos: any[];
  ngOnInit() {
    this.paramsSubCategoria = this.rutaActiva.snapshot.params.subCategoria;
    this.productosService
      .obtenerProductosCategoria(this.paramsSubCategoria)
      .then((data) => {
        this.productos = data["cont"];
        console.log(this.productos);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
