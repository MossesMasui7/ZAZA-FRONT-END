import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CarruselDepartamentosPage } from "./carrusel-departamentos.page";

const routes: Routes = [
  {
    path: "",
    component: CarruselDepartamentosPage,
  },
  {
    path: "subcategoria/:categoria",
    loadChildren: () =>
      import("./subcategoria/subcategoria.module").then(
        (m) => m.SubcategoriaPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarruselDepartamentosPageRoutingModule {}
