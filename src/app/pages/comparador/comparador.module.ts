import { SharedModule } from "./../../componentes/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ComparadorPageRoutingModule } from "./comparador-routing.module";

import { ComparadorPage } from "./comparador.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparadorPageRoutingModule,
    SharedModule,
  ],
  declarations: [ComparadorPage],
})
export class ComparadorPageModule {}
