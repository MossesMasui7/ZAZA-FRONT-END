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
  ],
  declarations: [AltaProductoPage],
})
export class AltaProductoPageModule {}
