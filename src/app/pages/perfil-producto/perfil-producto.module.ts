import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilProductoPageRoutingModule } from './perfil-producto-routing.module';

import { PerfilProductoPage } from './perfil-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilProductoPageRoutingModule
  ],
  declarations: [PerfilProductoPage]
})
export class PerfilProductoPageModule {}
