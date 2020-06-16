import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarProductoPageRoutingModule } from './actualizar-producto-routing.module';
import {MenuComponent} from '../../componentes/menu/menu.component'

import { ActualizarProductoPage } from './actualizar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarProductoPageRoutingModule
  ],
  declarations: [ActualizarProductoPage,MenuComponent]
})
export class ActualizarProductoPageModule {}
