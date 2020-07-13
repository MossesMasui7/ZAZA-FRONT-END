import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparadorTiendaPageRoutingModule } from './comparador-tienda-routing.module';

import { ComparadorTiendaPage } from './comparador-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparadorTiendaPageRoutingModule
  ],
  declarations: [ComparadorTiendaPage]
})
export class ComparadorTiendaPageModule {}
