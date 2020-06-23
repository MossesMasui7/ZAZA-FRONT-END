import { ProductoService } from "src/app/services/producto.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { MyserviceService } from "../../services/myservice.service";
@Component({
  selector: "app-perfil-producto",
  templateUrl: "./perfil-producto.page.html",
  styleUrls: ["./perfil-producto.page.scss"],
})
export class PerfilProductoPage implements OnInit {
  public _id: String;
  public _idUsuario: String;
  public username: String;
  public texto: String;
  public fecha: Date;

  constructor(
    public producto: ProductoService,
    public router: Router,
    public alertController: AlertController,
    public http: HttpClient,
    private comenta: ProductoService,
    private cliente: MyserviceService
  ) {}
  estrella1 = true;
  estrella2 = true;
  estrella3 = true;
  estrella4 = true;
  estrella5 = true;
  cal1 = false;
  cal2 = false;
  cal3 = false;
  cal4 = false;
  cal5 = false;
  comment = false;
  comentario: String;
  ngOnInit() {}
  Update() {
    this.router.navigateByUrl("actualizar-producto");
  }
  starOne(button) {
    switch (button) {
      case 1:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.comment = true;
        break;
      case 2:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !true;
        this.cal2 = !false;
        this.comment = true;
        break;
      case 3:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !true;
        this.cal2 = !false;
        this.estrella3 = !true;
        this.cal3 = !false;
        this.comment = true;
        break;
      case 4:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !true;
        this.cal2 = !false;
        this.estrella3 = !true;
        this.cal3 = !false;
        this.estrella4 = !true;
        this.cal4 = !false;
        this.comment = true;
        break;
      case 5:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !true;
        this.cal2 = !false;
        this.estrella3 = !true;
        this.cal3 = !false;
        this.estrella4 = !true;
        this.cal4 = !false;
        this.estrella5 = !true;
        this.cal5 = !false;
        this.comment = true;
        break;
    }
  }

  hideStar(hide) {
    switch (hide) {
      case 1:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !false;
        this.cal2 = !true;
        this.estrella3 = !false;
        this.cal3 = !true;
        this.estrella4 = !false;
        this.cal4 = !true;
        this.estrella5 = !false;
        this.cal5 = !true;
        break;
      case 2:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !true;
        this.cal2 = !false;
        this.estrella3 = !false;
        this.cal3 = !true;
        this.estrella4 = !false;
        this.cal4 = !true;
        this.estrella5 = !false;
        this.cal5 = !true;
        break;
      case 3:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !true;
        this.cal2 = !false;
        this.estrella3 = !true;
        this.cal3 = !false;
        this.estrella4 = !false;
        this.cal4 = !true;
        this.estrella5 = !false;
        this.cal5 = !true;
        break;
      case 4:
        this.estrella1 = !true;
        this.cal1 = !false;
        this.estrella2 = !true;
        this.cal2 = !false;
        this.estrella3 = !true;
        this.cal3 = !false;
        this.estrella4 = !true;
        this.cal4 = !false;
        this.estrella5 = !false;
        this.cal5 = !true;
        break;
    }
  }
  descartar() {
    this.estrella1 = true;
    this.estrella2 = true;
    this.estrella3 = true;
    this.estrella4 = true;
    this.estrella5 = true;
    this.cal1 = false;
    this.cal2 = false;
    this.cal3 = false;
    this.cal4 = false;
    this.cal5 = false;
    this.comment = false;
  }
  agregarComentario() {
    this.comenta
      .agregarComentario(
        this.comenta.tiendas["_id"],
        this.cliente.userID,
        this.cliente.userName,
        this.texto,
        this.fecha
      )
      .then((respuesta) => {
        console.log(respuesta);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  actualizar() {
    this.router.navigate(["/actualizar-producto"]);
  }
}
