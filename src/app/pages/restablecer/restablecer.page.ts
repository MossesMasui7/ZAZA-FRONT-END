import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  public email:string = "";
  constructor() { }

  ngOnInit() {
  }

  sendLinkReset(){
    alert('Enviando')
  }
}
