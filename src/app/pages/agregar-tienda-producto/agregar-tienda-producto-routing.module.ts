import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTiendaProductoPage } from './agregar-tienda-producto.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTiendaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTiendaProductoPageRoutingModule {}
