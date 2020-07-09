import { SharedModule } from "./../../componentes/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AltaProductoPageRoutingModule } from "./alta-producto-routing.module";

import { AltaProductoPage } from "./alta-producto.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AltaProductoPageRoutingModule,
    SharedModule,
  ],
  declarations: [AltaProductoPage],
})
export class AltaProductoPageModule {}
