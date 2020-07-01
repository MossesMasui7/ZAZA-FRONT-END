import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
@Component({
  selector: "app-precio-promedio",
  templateUrl: "./precio-promedio.component.html",
  styleUrls: ["./precio-promedio.component.scss"],
})
export class PrecioPromedioComponent implements OnInit {
  public suma = 0;
  public precios = [];
  public promedio: any = 0;
  public divicion: any;
  public min = 0;
  public contador: any = 0;
  constructor(public producto: ProductoService) {}

  ngOnInit() {
    this.producto.tiendas["tiendas"].forEach((element) => {
      if (element["alcance"] != false) {
        this.suma += element.precio;
        this.precios.push(element.precio);
        this.contador++;
      }
    });
    this.divicion = this.suma / this.contador;
    this.promedio = this.divicion.toFixed(2);

    this.min = Math.min.apply(null, this.precios);
  }
}
