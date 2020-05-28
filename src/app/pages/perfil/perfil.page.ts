import { Component, OnInit,NgZone } from '@angular/core';
import { RegistroService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

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
    private alertController :AlertController, public filePath: FilePath, public fileChooser: FileChooser) { }

  ngOnInit() {
    
  }

  PickFile(){
    this.fileChooser.open().then((fileuri)=>{
      this.filePath.resolveNativePath(fileuri).then((resolvednativepath)=>{
        this.img = resolvednativepath;

      })
    })
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
