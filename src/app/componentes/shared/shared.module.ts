import { PuntosSuspensivosPipe } from "./../../pipes/puntos-suspensivos.pipe";
import { IonicModule } from "@ionic/angular";
import { MenuComponent } from "./../menu/menu.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [MenuComponent, PuntosSuspensivosPipe],
  imports: [CommonModule, IonicModule],
  exports: [MenuComponent, PuntosSuspensivosPipe],
})
export class SharedModule {}
