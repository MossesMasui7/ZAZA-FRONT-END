import { Component, OnInit } from "@angular/core";

import { NegocioService } from "../../services/negocio.service";
import { RegistroService } from "../../services/usuario.service";
import { MyserviceService } from "../../services/myservice.service";
import { Router } from "@angular/router";
import { ProductoService } from "src/app/services/producto.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-comparador",
  templateUrl: "./comparador.page.html",
  styleUrls: ["./comparador.page.scss"],
})
export class ComparadorPage implements OnInit {
  public cdb: any;
  public productos: any[] = [];
  private result: string = "None";

  constructor(
    public negocios: NegocioService,
    private usuarioService: RegistroService,
    private usuario: MyserviceService,
    public router: Router,
    public producto: ProductoService,
    public barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    //this.scanNow();
    this.producto
      .obtener("7791293032153")
      .then((data) => {
        this.productos.push(data["resp"]);
      })
      .catch((err) => {
        console.log(err);
      });
    this.producto
      .obtener("7509546008202")
      .then((data) => {
        this.productos.push(data["resp"]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.productos);

    // let min: number = 0.0;
    // for (let index = 0; index < 1; index++) {
    //   console.log("hdg");

    //   if (
    //     this.productos[index]["tiendas"][0]["precio"] /
    //       this.productos[index]["contenido"] <
    //     min
    //   ) {
    //     min =
    //       this.productos[index]["tiendas"][0]["precio"] /
    //       this.productos[index]["contenido"];
    //     console.log(min);
    //   }
    // }
  }

  scanNow() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.producto
          .obtener(barcodeData.text)
          .then((data) => {
            this.productos.push(data["resp"]);
            console.log(this.productos);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Ha ocurrido un error", err);
        this.result = "Ha ocurrido un error";
      });
  }
}
