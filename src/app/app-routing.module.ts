import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RegistroComponent } from "./pages/registro/registro.component";
import { BusquedaComponent } from "./pages/busqueda/busqueda.component";
import { LoginPage } from "./pages/login/login.page";
import { AltaProductoPage } from "./pages/alta-producto/alta-producto.page";
import { ActualizarUsuarioPage } from "./pages/actualizar-usuario/actualizar-usuario.page";
const routes: Routes = [
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/princpal/principal.module").then(
        (m) => m.PrincipalPageModule
      ),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "registro",
    component: RegistroComponent,
  },
  {
    path: "buscar",
    component: BusquedaComponent,
  },
  {
    path: "alta-producto",
    component: AltaProductoPage,
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("./pages/perfil/perfil.module").then((m) => m.PerfilPageModule),
  },
  {
    path: "restablecer",
    loadChildren: () =>
      import("./pages/restablecer/restablecer.module").then(
        (m) => m.RestablecerPageModule
      ),
  },
  {
    path: "actualizar-usuario",
    loadChildren: () =>
      import("./pages/actualizar-usuario/actualizar-usuario.module").then(
        (m) => m.ActualizarUsuarioPageModule
      ),
  },
  {
    path: "compras",
    loadChildren: () =>
      import("./pages/compras/compras.module").then((m) => m.ComprasPageModule),
  },
  {
    path: "registrar-negocio",
    loadChildren: () =>
      import("./pages/registrar-negocio/registrar-negocio.module").then(
        (m) => m.RegistrarNegocioPageModule
      ),
  },
  {
    path: "perfil-tienda",
    loadChildren: () =>
      import("./pages/perfil-tienda/perfil-tienda.module").then(
        (m) => m.PerfilTiendaPageModule
      ),
  },
  {
    path: "perfil-producto",
    loadChildren: () =>
      import("./pages/perfil-producto/perfil-producto.module").then(
        (m) => m.PerfilProductoPageModule
      ),
  },
  {
    path: "actualizar-producto",
    loadChildren: () =>
      import("./pages/actualizar-producto/actualizar-producto.module").then(
        (m) => m.ActualizarProductoPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
