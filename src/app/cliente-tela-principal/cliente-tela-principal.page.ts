import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-tela-principal',
  templateUrl: './cliente-tela-principal.page.html',
  styleUrls: ['./cliente-tela-principal.page.scss'],
})
export class ClienteTelaPrincipalPage implements OnInit {

  public escondePrimeiro: boolean = false;
  public escondeSegundo: boolean = true;

  constructor(public alertController: AlertController, public menuCtrl: MenuController, public toastController: ToastController, private router: Router) {
    this.menuCtrl.enable(false);
  }

  public hide() {
    this.escondePrimeiro = !this.escondePrimeiro;
    this.escondeSegundo = !this.escondeSegundo;
  }

  async acaoToast(tipo) {
    const toast = await this.toastController.create({
      cssClass: "padrao-toast",
      message: tipo + ' enviado com sucesso!',
      duration: 1000
    });
    toast.present();
  }

  async chamarGarcon() {
    const alert = await this.alertController.create({
      header: 'Deseja chamar o Garçom?',
      buttons: ['Cancelar', {
        text: 'Chamar',
        handler: () => {
          this.acaoToast("Chamada do Garçom");
        }
      }]
    });
    await alert.present();
  }

  async enviarSugestao() {
    const alert = await this.alertController.create({
      header: 'Envie sua dica, reclamação ou sugestão:',
      cssClass: 'ion-alert',
      inputs: [
        {
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Enviar',
          handler: info => {
          }
        }
      ]
    });
    await alert.present();
  }

  async sair() {
    const alert = await this.alertController.create({
      header: 'Você realmente deseja sair?',
      cssClass: 'ion-alert',
      buttons: ['Cancelar', {
        text: 'Sair',
        handler: () => {
          this.router.navigate(['cliente-qrcode']);
        }
      }]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
