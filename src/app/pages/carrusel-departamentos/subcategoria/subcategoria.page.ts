import { CategoriaProductoService } from "./../../../services/categoria-producto.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
@Component({
  selector: "app-subcategoria",
  templateUrl: "./subcategoria.page.html",
  styleUrls: ["./subcategoria.page.scss"],
})
export class SubcategoriaPage implements OnInit {
  constructor(
    public rutaActiva: ActivatedRoute,
    public categoria: CategoriaProductoService,
    public router: Router
  ) {}
  public paramsCategoria: any;
  public categorias: any[];
  ngOnInit() {
    this.paramsCategoria = this.rutaActiva.snapshot.params.categoria;
    this.categoria
      .obtenerSubCategoria(this.paramsCategoria)
      .then((data) => {
        this.categorias = data["cont"]["subCategoria"];
      })
      .catch((err) => {
        console.log(err);
      });
  }
  select(categoria: string) {
    this.router.navigate([
      `carrusel-departamentos/subcategoria/${this.paramsCategoria}/productos/${categoria}`,
    ]);
  }
}
