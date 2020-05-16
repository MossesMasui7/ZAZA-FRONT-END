import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RegistroComponent} from './pages/registro/registro.component'
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import {LoginPage} from './pages/login/login.page'
import {AltaProductoPage} from './pages/alta-producto/alta-producto.page'
const routes: Routes = [
  {
path:"login",
component:LoginPage
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/princpal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'registro',
    component:RegistroComponent
  },
  {
    path:"buscar",
    component:BusquedaComponent
  },
  {
    path:'alta-producto',
    component:AltaProductoPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
