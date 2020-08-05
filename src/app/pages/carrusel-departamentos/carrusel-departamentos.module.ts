import { SharedModule } from "./../../componentes/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CarruselDepartamentosPageRoutingModule } from "./carrusel-departamentos-routing.module";

import { CarruselDepartamentosPage } from "./carrusel-departamentos.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarruselDepartamentosPageRoutingModule,
    SharedModule,
  ],
  declarations: [CarruselDepartamentosPage],
})
export class CarruselDepartamentosPageModule {}
