import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaProductoPageRoutingModule } from './alta-producto-routing.module';
import {MenuComponent} from '../../componentes/menu/menu.component'
import { AltaProductoPage } from './alta-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaProductoPageRoutingModule
  ],
  declarations: [AltaProductoPage,MenuComponent]
})
export class AltaProductoPageModule {}
