import { Component, OnInit, NgZone } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { AlertController, NavController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { debounceTime } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { element } from "protractor";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
@Component({
  selector: "app-alta-producto",
  templateUrl: "./alta-producto.page.html",
  styleUrls: ["./alta-producto.page.scss"],
  styles: [
    `
      .ocupado {
        color: red;
      }
    `,
  ],
})
export class AltaProductoPage implements OnInit {
  cdb: any = new FormControl("");
  descripcion: string;
  marca: string;
  alias: string;
  nombre: string;

  public img: String = "../../../assets/iconos/userico";
  coinciden: boolean = false;
  disponible: boolean = false;

  constructor(
    private productoService: ProductoService,
    private camera: Camera,
    private alertController: AlertController,
    private router: Router,
    private zone: NgZone,
    private barcodeScanner: BarcodeScanner,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cdb.valueChanges.subscribe((palabra) => {
      this.productoService
        .obtenerCDB(palabra)
        .then((data) => {
          this.disponible = data["disponible"];
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  escanear() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.cdb = barcodeData.text;
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  imgSelect() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.img = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }

  subir() {
    let pro = {
      cdb: this.cdb.value,
      descripcion: `${this.nombre.toLowerCase()} ${this.marca.toLowerCase()} ${this.descripcion.toLowerCase()} (${this.alias.toLowerCase()}) `,
      nombre: this.nombre.toLowerCase(),
      img: this.img,
    };
    if (
      this.cdb.value == null ||
      this.descripcion == null ||
      this.nombre == null ||
      this.marca == null
    ) {
      this.presentAlert("Faltan campos", "Alerta");
    } else {
      this.productoService
        .postproducto(pro)
        .then((data) => {
          this.presentAlert("Producto agregado con Exito", "Alerta");
          this.productoService.tiendas = data["pDB"];

          this.router.navigate([`/agregar-tienda-producto`]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  async presentAlert(mensaje: any, heade: any) {
    const alert = await this.alertController.create({
      header: heade,
      message: mensaje,
      buttons: ["OK"],
    });

    await alert.present();
  }
  swipe() {
    this.navCtrl.pop();
  }
}
