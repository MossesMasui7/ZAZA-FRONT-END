import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MyserviceService } from '../services/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  username:String;
  contrasena:String;

  constructor(private alertController: AlertController,public myserviceService:MyserviceService, private router:Router) { }

//  metodo por donde es llamado desde el html
  login(){
    let user ={
      username:this.username,
      contrasena:this.contrasena
    }
    // validaciones del login , el metodo postUser(user) se manda a llamar al servicio
    this.myserviceService.postUser(user).then(data =>{
      if(this.username == this.username && this.contrasena == this.contrasena){
        console.log("Usuario correcto")
       this.router.navigate(['./home']); 
      } else {
        // this.presentAlert();
      }
    });
   
  }
  
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Alerta',
  //     subHeader: 'Error',
  //     message: 'Usuario o contraseña incorrecta',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }
  
}
