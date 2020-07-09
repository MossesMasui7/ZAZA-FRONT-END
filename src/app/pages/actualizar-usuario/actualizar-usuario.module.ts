import { SharedModule } from "./../../componentes/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ActualizarUsuarioPageRoutingModule } from "./actualizar-usuario-routing.module";
import { MenuComponent } from "../../componentes/menu/menu.component";

import { ActualizarUsuarioPage } from "./actualizar-usuario.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarUsuarioPageRoutingModule,
    SharedModule,
  ],
  declarations: [ActualizarUsuarioPage],
})
export class ActualizarUsuarioPageModule {}
