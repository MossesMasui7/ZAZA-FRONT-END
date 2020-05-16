import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RegistroComponent} from './pages/registro/registro.component'
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { PrecioPromedioComponent } from './componentes/precio-promedio/precio-promedio.component';
import { TiendasCercanasComponent } from './componentes/tiendas-cercanas/tiendas-cercanas.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
    path: 'alta-producto',
    loadChildren: () => import('./alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path:"precio-promedio",
    component:PrecioPromedioComponent
  },
  {
    path:"tiendas-cercanas",
    component:TiendasCercanasComponent
  }
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
