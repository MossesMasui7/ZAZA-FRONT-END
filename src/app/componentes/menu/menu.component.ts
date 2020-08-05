import { MyserviceService } from "src/app/services/myservice.service";
import { RegistroService } from "./../../services/usuario.service";
import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { MenuController, NavController } from "@ionic/angular";
import { IonRouterOutlet } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Input() titulo: String;
  canGoBack: boolean = false;

  constructor(
    private router: Router,
    public usuario2: RegistroService,
    public usuario: MyserviceService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    if (this.router.url == "/home") {
      this.canGoBack = false;
    } else {
      this.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();
    }
    if (!this.usuario.usuario) {
      location.href = "/";
    }
  }

  cart() {
    this.router.navigate(["/carrito"]);
  }
  open() {
    this.menuCtrl.open();
  }
  back() {
    this.navCtrl.pop();
  }
}
