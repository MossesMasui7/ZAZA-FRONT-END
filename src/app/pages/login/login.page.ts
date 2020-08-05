import { Component, OnInit, NgZone } from "@angular/core";
import {
  AlertController,
  MenuController,
  ToastController,
  Platform,
  NavController,
} from "@ionic/angular";
import { MyserviceService } from "../../services/myservice.service";
import { Router } from "@angular/router";
import { RegistroService } from "src/app/services/usuario.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  username: String;
  contrasena: String;
  //contador de dias activo
  puntos: number = 0;

  constructor(
    private alertController: AlertController,
    public myserviceService: MyserviceService,
    private router: Router,
    public usuario: RegistroService,
    public menuCtrl: MenuController,
    public toast: ToastController,
    public plataform: Platform,
    public navCtrl: NavController
  ) {
    this.plataform.backButton.subscribeWithPriority(666666, () => {
      if (location.pathname == "/login") {
        navigator["app"].exitApp();
      } else {
        this.navCtrl.pop();
      }
    });
  }

  ionViewWillEnter() {
    console.log(location.pathname);

    this.menuCtrl.enable(false);
    if (localStorage.getItem("usuario")) {
      this.myserviceService.usuario = JSON.parse(
        localStorage.getItem("usuario")
      );
      this.usuario.actualizarUsuario().then((data) => {
        this.myserviceService.usuario = data["resp"];
      });
      this.router.navigate(["/home"]);
    }
  }

  registrar() {
    this.router.navigate(["/registro"]);
  }

  //  metodo por donde es llamado desde el html
  login() {
    let user = {
      username: this.username,
      contrasena: this.contrasena,
      puntos: this.puntos,
    };
    // validaciones del login , el metodo postUser(user) se manda a llamar al servicio
    this.myserviceService
      .postUser(user)
      .then((data) => {
        this.presentToast("Usuario Autentificado Correctamente");
        this.contrasena = "";
        this.router.navigate(["./home"]);
        // this.myserviceService.postCon(user).then((data) => {
        //   console.log(this.username);

        //   // revisar por que le falta usar no esta usando para,etps
        // });
      })
      .catch((err) => {
        this.presentToast("Usuario o Contraseña Incorrectos");
      });
  }

  async presentToast(text: string) {
    const toast = await this.toast.create({
      message: text,
      duration: 2000,
    });
    toast.present();
  }
  invitado() {
    this.myserviceService.usuario = {
      asistencia: 1,
      carrito: [],
      contrasena: "",
      email: "unknow",
      emailConfirmado: false,
      estatus: true,
      img: "../../../assets/iconos/user_add_21977.ico",
      insignias: [],
      nombre: "unknow",
      premium: false,
      puntos: 0,
      telefono: "0",
      username: "unknow",
      __v: 0,
      _id: "0",
    };
    localStorage.setItem(
      "usuario",
      JSON.stringify(this.myserviceService.usuario)
    );
    this.router.navigate(["./home"]);
  }
}
