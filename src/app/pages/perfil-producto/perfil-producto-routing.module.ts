import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilProductoPage } from './perfil-producto.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilProductoPageRoutingModule {}
