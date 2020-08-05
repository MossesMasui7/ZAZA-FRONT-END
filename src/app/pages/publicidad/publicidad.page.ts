import { PublicidadService } from "./../../services/publicidad.service";
import { NegocioService } from "./../../services/negocio.service";
import { Component, OnInit } from "@angular/core";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-publicidad",
  templateUrl: "./publicidad.page.html",
  styleUrls: ["./publicidad.page.scss"],
})
export class PublicidadPage implements OnInit {
  public img1: String;
  public img2: String;
  public img3: String;
  public ArrayNegocio: any;
  public negocioId: String;
  constructor(
    private camera: Camera,
    public negocios: NegocioService,
    public publicidad: PublicidadService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.negocios.obtenerNegocios().subscribe((data) => {
      this.ArrayNegocio = data;
    });
  }
  imgUno() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 450,
      targetHeight: 250,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.img1 = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }
  imgDos() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 450,
      targetHeight: 250,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.img2 = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }
  imgTres() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 450,
      targetHeight: 250,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.img3 = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }
  publicar() {
    if (this.negocioId) {
      let datos = {
        uno: this.img1,
        dos: this.img2,
        tres: this.img3,
      };

      this.publicidad
        .registrar(this.negocioId, datos)
        .then((data) => {
          this.presentToast("Registro Realizado Exitosamente");
        })
        .catch((err) => {
          this.presentToast(err);
        });
    } else {
      this.presentToast("Seleccione un Negocio");
    }
  }

  async presentToast(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
    });
    toast.present();
  }
}
