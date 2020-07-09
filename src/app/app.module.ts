import { SharedModule } from "./componentes/shared/shared.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

//herramientas
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecaptchaModule } from "ng-recaptcha";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";

//Paginas y componenetes
import { RegistroComponent } from "./pages/registro/registro.component";
import { BusquedaComponent } from "./pages/busqueda/busqueda.component";
import { PrecioPromedioComponent } from "./componentes/precio-promedio/precio-promedio.component";
import { TiendasCercanasComponent } from "./componentes/tiendas-cercanas/tiendas-cercanas.component";
import { LoginPage } from "./pages/login/login.page";
import { AltaProductoPage } from "./pages/alta-producto/alta-producto.page";
import { MapaComponent } from "./componentes/mapa/mapa.component";

import { NegocioService } from "./services/negocio.service";

import { RouterModule } from "@angular/router";
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import * as Hammer from "hammerjs";
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: Hammer.DIRECTION_ALL,
    },
    swipe: { direction: Hammer.DIRECTION_RIGHT },
  };
}
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginPage,
    AltaProductoPage,
    MapaComponent,
    BusquedaComponent,
    PrecioPromedioComponent,
    TiendasCercanasComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RouterModule,
    SharedModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    Camera,
    BarcodeScanner,
    Geolocation,

    NegocioService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
