import { MyserviceService } from "src/app/services/myservice.service";
import { RegistroService } from "./../../services/usuario.service";
import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Input() titulo: String;
  constructor(
    private router: Router,
    public usuario2: RegistroService,
    public usuario: MyserviceService
  ) {}

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
      ruta: "registrar-negocio",
      color: "",
    },
    {
      titulo: "Cerrar Sesión",
      icono: "log-out",
      ruta: "login",
      color: "danger",
    },
  ];

  ngOnInit() {
    if (!this.usuario.usuario) {
      location.href = "/";
    }
  }

  cart() {
    this.router.navigate(["/carrito"]);
  }
  navegar(ruta: String) {
    if (ruta == "login") {
      localStorage.removeItem("usuario");
    }

    this.router.navigate([`./${ruta}`]);
  }
}
