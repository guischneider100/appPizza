import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-tela-principal',
  templateUrl: './empresa-tela-principal.page.html',
  styleUrls: ['./empresa-tela-principal.page.scss'],
})
export class EmpresaTelaPrincipalPage implements OnInit {

  constructor(public menuCtrl: MenuController, public toastController: ToastController, private router: Router, public alertController: AlertController) { 
    this.menuCtrl.enable(true);
  }

  async sair() {
    const alert = await this.alertController.create({
      header: 'Você realmente deseja sair?',
      cssClass: 'ion-alert',
      buttons: ['Cancelar', {
        text: 'Sair',
        handler: () => {
          this.router.navigate(['empresa-login']);
        }
      }]
    });
    await alert.present();
  }

  async acaoToast() {
    const toast = await this.toastController.create({
      cssClass: "padrao-toast",
      message: 'Atendimento(s) finalizado(s) com sucesso!',
      duration: 1000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
