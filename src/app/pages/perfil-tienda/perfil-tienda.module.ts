import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilTiendaPageRoutingModule } from './perfil-tienda-routing.module';

import { PerfilTiendaPage } from './perfil-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilTiendaPageRoutingModule
  ],
  declarations: [PerfilTiendaPage]
})
export class PerfilTiendaPageModule {}
