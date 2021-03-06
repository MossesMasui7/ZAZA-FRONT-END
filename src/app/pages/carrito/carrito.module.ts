import { SharedModule } from "./../../componentes/shared/shared.module";
import { MenuComponent } from "./../../componentes/menu/menu.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CarritoPageRoutingModule } from "./carrito-routing.module";

import { CarritoPage } from "./carrito.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoPageRoutingModule,
    SharedModule,
  ],
  declarations: [CarritoPage],
})
export class CarritoPageModule {}
