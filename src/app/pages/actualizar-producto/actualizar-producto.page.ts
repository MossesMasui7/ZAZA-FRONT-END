import { Component, OnInit } from "@angular/core";
import { ProductoService } from "src/app/services/producto.service";
import { AlertController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-actualizar-producto",
  templateUrl: "./actualizar-producto.page.html",
  styleUrls: ["./actualizar-producto.page.scss"],
})
export class ActualizarProductoPage implements OnInit {
  public descripcion: String;
  public Img: String = "../../../assets/iconos/user_add_21977.ico";
  public nombre:String;
  public marca:String;

  constructor(
    public actualizacion: ProductoService,
    private camera: Camera,
    private alertController: AlertController
  ) {}

  ngOnInit() {}
  actualizar(descripcion) {
    this.actualizacion
      .actualizar(this.actualizacion.tiendas["_id"], descripcion,this.Img)
      .then((data) => {
        alert("Producto Actualizado");
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async presentAlert(mensaje: any, heade: any) {
    const alert = await this.alertController.create({
      header: heade,
      message: mensaje,
      buttons: ["OK"],
    });

    await alert.present();
  }
  imgSelect() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.Img = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }
}
