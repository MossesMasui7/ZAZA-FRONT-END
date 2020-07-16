import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparadorTiendaPage } from './comparador-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: ComparadorTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparadorTiendaPageRoutingModule {}
