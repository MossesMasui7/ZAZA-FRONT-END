import { Component, OnInit, NgZone  } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
  


})
export class AltaProductoPage implements OnInit {

  marca :string ;
  modelo :string;
  nombre: string;
  cdb:any = new FormControl('')
  cdbs: string;
  precio: string;
  descripcion: string;
  alias:string;

  

  img:String = "../../../assets/iconos/user_add_21977.ico";
  coinciden:boolean = false;
  disponible:boolean = false;


  constructor(private productoService:ProductoService,
     private camera:Camera,private alertController :AlertController,
     private router: Router, 
     private zone: NgZone ) { } 

  ngOnInit() {
    this.cdb.valueChanges.subscribe((palabra)=>{
      this.productoService.obtenerCDB(palabra).then((data)=>{
        this.disponible = data['disponible']
        console.log(data)
        this.cdbs = palabra;
        
      }).catch((err)=>{
        console.error(err);
        
      })
    })
    



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

  subir(){
    let pro ={
      marca:this.marca,
      modelo:this.modelo,
      nombre:this.nombre,
      cdb:this.cdbs,
      precio:this.precio,
      
      descripcion:this.descripcion,
      alias:this.alias,
      img:this.img
    }
    if(this.marca == null || this.modelo == null || this.nombre == null|| this.cdb == null ||this.precio == null||
       this.descripcion == null ||this.alias == null) {
        this.presentAlert("Faltan campos","Alerta");
      }
      else {
        this.productoService.postproducto(pro).then(data=>{
          this.presentAlert("Producto agregado con Exito","Alerta");
          this.router.navigate([`/home`]);
        })
        
        
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


