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
    this.scanNow();
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
