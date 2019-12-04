import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IpService } from '../conexao/ip.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
  providers: [
    IpService
  ]
})
export class TelaInicialPage implements OnInit {

  public enviaIP: string;
  public botaoVisivel = true;

  constructor(public menuCtrl: MenuController,
    public ip: IpService) { 
    this.menuCtrl.enable(false);
  }

  enviaIp() {
    this.ip.setIP(this.enviaIP);
    this.botaoVisivel = false;
  }

  ngOnInit() {
  }

}
