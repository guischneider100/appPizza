import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { QrcodeService } from '../conexao/qrcode.service';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';

@Component({
  selector: 'app-empresa-tela-qrcode',
  templateUrl: './empresa-tela-qrcode.page.html',
  styleUrls: ['./empresa-tela-qrcode.page.scss'],
  providers: [
    ConfiguracaoServService,
    QrcodeService
  ]
})
export class EmpresaTelaQrcodePage implements OnInit {

  public qrcodes: any;
  public empresa: any;

  constructor(private route: ActivatedRoute, 
    public toastController: ToastController, 
    private router: Router,
    public qrcodeService: QrcodeService,
    public configService: ConfiguracaoServService) { }

  async acaoToast(tipo) {
    const toast = await this.toastController.create({
      cssClass: "padrao-toast",
      message: 'QR Code(s) ' + tipo + ' com sucesso!',
      duration: 1000
    });
    this.router.navigate(['empresa-tela-qrcode']);
    toast.present();
  }

  ionViewWillEnter() {
    let config = JSON.parse(this.configService.getConfigData());
    this.empresa = config.codigoEmpresa;
    this.qrcodeService.buscarQRCodes(config.access_token)
      .subscribe(
        data => {
          this.qrcodes = data;
        }, error => {
        }
      )
  }

  cadastrarQRCode() {
    this.router.navigate(['empresa-tela-edita-qrcode']);
  }

  ngOnInit() {
  }

}
