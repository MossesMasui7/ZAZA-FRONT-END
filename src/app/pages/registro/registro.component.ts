import { Component, OnInit, NgZone } from '@angular/core';
import {RegistroService} from '../../services/usuario.service'
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  styles:[
    `
  
    .ocupado { border:0.5px solid rgba(231, 12, 12, 0.685); }

    `
  ]
})
//.disponiblee { border:0.5px solid rgba(187, 255, 0, 0.685); }
export class RegistroComponent implements OnInit {
nombre:String
username:any = new FormControl('')
user:String
contrasena:String
contrasena2 = new FormControl('')
contra:String
email:String
telefono:String

captchaPassed: boolean = false;
captchaResponse: string;
Img:String = "../../../assets/iconos/user_add_21977.ico"
coinciden:boolean = false
disponible:boolean = false

  constructor(
    private zone: NgZone,
    private router: Router,
    private usuarioService:RegistroService,
    private alertController :AlertController,
    private camera:Camera
    ){ }

  ngOnInit() {
    this.username.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((palabra)=>{
      this.usuarioService.obtener(palabra).then((data)=>{
        this.disponible = data['disponible']
        console.log(data)
        this.user = palabra
        
      }).catch((err)=>{
        console.error(err);
        
      })
    })

    this.contrasena2.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((data)=>{
      if (data != this.contrasena) {
        this.coinciden = false
      }else{
        this.coinciden =true
        this.contra = data
      }
      })

  
  }

  captchaResolved(response: string): void {

    this.zone.run(() => {
        this.captchaPassed = true;
        this.captchaResponse = response;
    });

  }

/*leerCodigo(){
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
   }).catch(err => {
       console.log('Error', err);
   });
}*/
imgSelect(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.Img = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
}

  registrar(nombre:String,username:String,email:String,contrasena:String,contrasena2:String,telefono:String){

    if (nombre == null || username == null || email == null || contrasena == null || contrasena2 == null || telefono == null) {
      this.presentAlert("Faltan campos","Alerta")
    }else{
    if (contrasena == this.contra) {
      this.usuarioService.registrar(nombre, this.user,email,contrasena,this.Img,telefono).then((data)=>{
        this.presentAlert("Se envio un correo de confirmacion","Exitoso")
        this.router.navigate([`/login`]);

      }).catch((err)=>{
        this.presentAlert(err.error.err.message,"Alerta")
      })
    }else{
      this.presentAlert("Contraseñas no coinciden","Alerta")
    }
  }
    
  }


async presentAlert(mensaje:any,heade:any) {
  const alert = await this.alertController.create({
    header: heade,
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();
}

}
