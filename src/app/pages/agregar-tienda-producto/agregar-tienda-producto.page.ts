import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
@Component({
  selector: "app-agregar-tienda-producto",
  templateUrl: "./agregar-tienda-producto.page.html",
  styleUrls: ["./agregar-tienda-producto.page.scss"],
})
export class AgregarTiendaProductoPage implements OnInit {
  constructor(public producto: ProductoService) {}

  ngOnInit() {}
}
