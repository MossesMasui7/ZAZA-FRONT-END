import { SharedModule } from "./../../componentes/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PrincipalPageRoutingModule } from "./principal-routing.module";
import { BuscadorComponent } from "../../componentes/buscador/buscador.component";
import { PrincipalPage } from "./principal.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    SharedModule,
  ],
  declarations: [PrincipalPage, BuscadorComponent],
})
export class PrincipalPageModule {}
