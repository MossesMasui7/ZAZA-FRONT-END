import { SharedModule } from "./../../componentes/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PublicidadPageRoutingModule } from "./publicidad-routing.module";

import { PublicidadPage } from "./publicidad.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicidadPageRoutingModule,
    SharedModule,
  ],
  declarations: [PublicidadPage],
})
export class PublicidadPageModule {}
