import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { RegistroService } from "../../services/usuario.service";
import { MyserviceService } from "src/app/services/myservice.service";
@Component({
  selector: "app-actualizar-usuario",
  templateUrl: "./actualizar-usuario.page.html",
  styleUrls: ["./actualizar-usuario.page.scss"],
})
export class ActualizarUsuarioPage implements OnInit {
  public nombre: String;
  public telefono: String;
  public Img: any;
  constructor(
    public actualizar: RegistroService,
    public camera: Camera,
    public usuario: MyserviceService
  ) {}

  ngOnInit() {}
  actualizacion() {
    this.actualizar
      .actualizar(this.nombre, this.telefono, this.Img)
      .then((respuesta) => {
        console.log(respuesta);
      })
      .catch((err) => {
        console.log(err);
      });
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

  actualizarPass() {
    this.actualizar
      .reset(this.usuario.usuario["email"])
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
