import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-empresa-tela-edita-qrcode',
  templateUrl: './empresa-tela-edita-qrcode.page.html',
  styleUrls: ['./empresa-tela-edita-qrcode.page.scss'],
})
export class EmpresaTelaEditaQrcodePage implements OnInit {

  constructor(private route: ActivatedRoute, public toastController: ToastController, private router: Router) { }

  async acaoToast() {
    const toast = await this.toastController.create({
      cssClass: "padrao-toast",
      message: 'QR Code cadastrado com sucesso!',
      duration: 1000
    });
    this.router.navigate(['empresa-tela-qrcode']);
    toast.present();
  }

  ngOnInit() {
  }

}
