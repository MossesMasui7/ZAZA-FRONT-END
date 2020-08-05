import { CategoriaProductoService } from "./../../services/categoria-producto.service";
import { BuscadorComponent } from "./../../componentes/buscador/buscador.component";
import { Component, OnInit, NgZone } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { AlertController, NavController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
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
  contenido: number = 1;
  tipoContenido: string;
  categoriaProducto: string;

  public img: any = "noimage";
  coinciden: boolean = false;
  disponible: boolean = false;
  categorias: any[] = [];
  subcategorias: any[] = [];

  constructor(
    private productoService: ProductoService,
    private camera: Camera,
    private alertController: AlertController,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public buscador: BuscadorComponent,
    public categoria: CategoriaProductoService
  ) {}

  ngOnInit() {
    this.cdb.setValue(this.productoService.cdb);
    this.checkCDB(this.productoService.cdb);
    this.cdb.valueChanges.subscribe((palabra) => {
      this.checkCDB(palabra);
    });

    this.categoria
      .obtenerCategoria()
      .then((data) => {
        this.categorias = data["cont"];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  escanear() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.cdb.setValue(barcodeData.text);
        this.checkCDB(this.cdb.value);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.imgSelect(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.imgSelect(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }

  checkCDB(cdb) {
    this.productoService
      .obtenerCDB(cdb)
      .then((data) => {
        this.disponible = data["disponible"];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  imgSelect(sourceType) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
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
    let pro;
    if (this.alias) {
      pro = {
        cdb: this.cdb.value,
        descripcion: `${this.nombre.toLowerCase()} ${this.marca.toLowerCase()} ${this.descripcion.toLowerCase()} (${this.alias.toLowerCase()}) `,
        contenido: this.contenido,
        tipoContenido: this.tipoContenido,
        categoria: this.categoriaProducto,
        img: this.img,
      };
    } else {
      pro = {
        cdb: this.cdb.value,
        descripcion: `${this.nombre.toLowerCase()} ${this.marca.toLowerCase()} ${this.descripcion.toLowerCase()}`,
        contenido: this.contenido,
        tipoContenido: this.tipoContenido,
        categoria: this.categoriaProducto,
        img: this.img,
      };
    }

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
          this.presentAlert(
            "Producto registrado correctamente",
            "Transaccion correctamente"
          );
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
  onChange($event) {
    this.categoria
      .obtenerSubCategoria($event.target.value)
      .then((data) => {
        this.subcategorias = data["cont"]["subCategoria"];
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
