import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SubcategoriaPage } from "./subcategoria.page";

const routes: Routes = [
  {
    path: "",
    component: SubcategoriaPage,
  },
  {
    path: "productos/:subCategoria",
    loadChildren: () =>
      import("./productos/productos.module").then((m) => m.ProductosPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcategoriaPageRoutingModule {}
