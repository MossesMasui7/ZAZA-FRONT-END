import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//herramientas
import { HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RecaptchaModule } from 'ng-recaptcha';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

//Paginas y componenetes
import {RegistroComponent} from './pages/registro/registro.component'
import {BusquedaComponent} from './pages/busqueda/busqueda.component'
import {BuscadorComponent} from './componentes/buscador/buscador.component'
import {PrecioPromedioComponent} from './componentes/precio-promedio/precio-promedio.component'
import {TiendasCercanasComponent} from './componentes/tiendas-cercanas/tiendas-cercanas.component'
@NgModule({
  declarations: [AppComponent, RegistroComponent,BuscadorComponent,BusquedaComponent,PrecioPromedioComponent,TiendasCercanasComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule,RecaptchaModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
