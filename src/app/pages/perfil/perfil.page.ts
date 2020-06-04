import { Component, OnInit,NgZone } from '@angular/core';
import { RegistroService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
 img: string= "";
 insignia: string;
 nivel: string;
 puntos: string;
 seguidores: string;
 seguidos: string;

  constructor(private zone: NgZone,private registroService:RegistroService,
    private alertController :AlertController,private camera:Camera ) { }

  ngOnInit() {
    
  }

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
     this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }


  // imgSelect(){
  //   let pro ={
  //     img:this.img
  //   }
  //   this.registroService.postimg(pro).then(data=>{
  //     this.presentAlert("Producto agregado con Exito","Alerta");
  //   })
  // }

  async presentAlert(mensaje:any,heade:any) {
    const alert = await this.alertController.create({
      header: heade,
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
