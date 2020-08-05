import { Router } from "@angular/router";
import { CategoriaProductoService } from "./../../services/categoria-producto.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-carrusel-departamentos",
  templateUrl: "./carrusel-departamentos.page.html",
  styleUrls: ["./carrusel-departamentos.page.scss"],
})
export class CarruselDepartamentosPage implements OnInit {
  constructor(
    public categoria: CategoriaProductoService,
    public router: Router
  ) {}
  public categorias: any[] = [];
  ngOnInit() {
    this.categoria
      .obtenerCategoria()
      .then((data) => {
        this.categorias = data["cont"];
        console.log(this.categorias);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  select(categoria: string) {
    this.router.navigate([`carrusel-departamentos/subcategoria/${categoria}`]);
  }
}
