import { NegocioService } from "./../../services/negocio.service";
import { AgregarTiendaProductoPage } from "./../agregar-tienda-producto/agregar-tienda-producto.page";
import { MyserviceService } from "src/app/services/myservice.service";
import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { RouterLink, Router } from "@angular/router";
import { Store } from "../../models/store";
import { Category } from "../../models/categoria";

@Component({
  selector: "app-registrar-negocio",
  templateUrl: "./registrar-negocio.page.html",
  styleUrls: ["./registrar-negocio.page.scss"],
})
export class RegistrarNegocioPage implements OnInit {
  categorias: Category[] = [];
  dataS: Store;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private service: NegocioService,
    public usuario: MyserviceService,
    public navCtrl: NavController,
    public negocio: NegocioService
  ) {
    this.dataS = new Store();
  }

  ngOnInit() {
    this.dataS.latitude = this.usuario.lo;
    this.dataS.longitude = this.usuario.la;
    this.service.obtenerCategorias().subscribe((data: Category[]) => {
      this.categorias = data;
      console.log(this.categorias);
    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: "¿Seguro que deseas continuar?",
      inputs: [
        {
          name: "name1",
          type: "text",
          value: this.dataS.nombre,
          placeholder: "Placeholder",
        },
        {
          name: "name2",
          type: "text",
          id: "name2-id",
          value: this.dataS.direccion,
          placeholder: "Placeholder 2",
        },
        {
          name: "name2",
          type: "text",
          id: "name2-id",
          value: this.dataS.calificacion,
          placeholder: "Placeholder 2",
        },
        {
          name: "name2",
          type: "text",
          id: "name2-id",
          value: this.dataS.categorias,
          placeholder: "Placeholder 2",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancelar");
          },
        },
        {
          text: "Aceptar",
          handler: () => {
            console.log("Aceptar");
            this.service.createItem(this.dataS).subscribe((response) => {
              this.negocio.obtenerNegociosCercanos();
              this.navCtrl.pop();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
