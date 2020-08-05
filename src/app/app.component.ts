import { Component, Input } from "@angular/core";

import {
  Platform,
  NavController,
  MenuController,
  IonRouterOutlet,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { RegistroService } from "./services/usuario.service";
import { MyserviceService } from "./services/myservice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public usuario2: RegistroService,
    public usuario: MyserviceService,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  public nombre: String = "Unknow";
  public sideBar: any[] = [
    {
      titulo: "Inicio",
      icono: "home",
      ruta: "home",
      color: "",
    },
    {
      titulo: "Alta Producto",
      icono: "add",
      ruta: "alta-producto",
      color: "",
    },
    {
      titulo: "Alta Negocio",
      icono: "add",
      ruta: "registrar-negocio",
      color: "",
    },
    {
      titulo: "Comparador Productos",
      icono: "cash",
      ruta: "comparador",
      color: "",
    },
    {
      titulo: "Comprar Publicidad",
      icono: "color-palette",
      ruta: "publicidad",
      color: "",
    },
    {
      titulo: "Tienda",
      icono: "color-palette",
      ruta: "carrusel-departamentos",
      color: "",
    },
    {
      titulo: "Cerrar Sesión",
      icono: "log-out",
      ruta: "login",
      color: "danger",
    },
  ];
  canGoBack: boolean = false;
  login: boolean = true;

  ngOnInit() {
    if (this.router.url == "/login") {
      this.login = false;
    } else {
      this.login = true;
    }
  }

  navegar(ruta: String) {
    if (ruta == "login") {
      localStorage.removeItem("usuario");
    }

    this.router.navigate([`./${ruta}`]);
    this.menuCtrl.close();
  }
}
