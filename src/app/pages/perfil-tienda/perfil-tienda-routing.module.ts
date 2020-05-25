import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilTiendaPage } from './perfil-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilTiendaPageRoutingModule {}
