import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PopoverController } from '@ionic/angular';
import {PopoverComponent} from '../../componentes/popover/popover.component';
import {NegocioService} from  '../../services/negocio.service';
import {Store} from '../../models/store';


@Component({
  selector: 'app-perfil-tienda',
  templateUrl: './perfil-tienda.page.html',
  styleUrls: ['./perfil-tienda.page.scss'],
})
export class PerfilTiendaPage implements OnInit {
tiendas: Store[] = [];  

  constructor(public router: Router, public popoverController: PopoverController, private service: NegocioService) { }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  
  goUpdate(){
    this.router.navigateByUrl('actualizar-perfil');
  }
  ngOnInit() {
    this.service
      .obtenerNegocios()
      .subscribe((data: Store[]) => {
        this.tiendas = data;
        console.log(this.tiendas)
    });
  }

}
