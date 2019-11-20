import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-empresa-tela-qrcode',
  templateUrl: './empresa-tela-qrcode.page.html',
  styleUrls: ['./empresa-tela-qrcode.page.scss'],
})
export class EmpresaTelaQrcodePage implements OnInit {

  constructor(private route: ActivatedRoute, public toastController: ToastController, private router: Router) { }

  async acaoToast(tipo) {
    const toast = await this.toastController.create({
      cssClass: "padrao-toast",
      message: 'QR Code(s) ' + tipo + ' com sucesso!',
      duration: 1000
    });
    this.router.navigate(['empresa-tela-qrcode']);
    toast.present();
  }

  ngOnInit() {
  }

}
