import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { QrcodeService } from '../conexao/qrcode.service';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { PedidoService } from '../conexao/pedido.service';

@Component({
  selector: 'app-empresa-tela-qrcode',
  templateUrl: './empresa-tela-qrcode.page.html',
  styleUrls: ['./empresa-tela-qrcode.page.scss'],
  providers: [
    ConfiguracaoServService,
    QrcodeService,
    PedidoService
  ]
})
export class EmpresaTelaQrcodePage implements OnInit {

  public qrcod: any;
  public empresa: any;

  private qrCodesExcluidos: number;

  public pedidos = [];
  public qrcodes = [];
  uniqueArray = [];
  public podeGerarQRCode = false;
  public podeExcluirQRCode = false;

  i = 0;
  j = 0;

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    public qrcodeService: QrcodeService,
    public configService: ConfiguracaoServService,
    public pedidoService: PedidoService,
    private alertCtrl: AlertController) {

      setInterval(() => {
        this.i = 0;
        this.podeGerarQRCode = false;
        this.podeExcluirQRCode = false;
        while (this.i < this.qrcodes.length) {
          if (this.qrcodes[this.i].checked) {
            this.podeGerarQRCode = true;
            this.podeExcluirQRCode = true;
          }
          this.i++;
        }
      }, 100);

     }

  ionViewWillEnter() {
    let config = JSON.parse(this.configService.getConfigData());
    this.empresa = config.codigoEmpresa;

    this.pedidoService.buscarPedidos(config.access_token)
      .subscribe(
        data => {
          while (this.i < Object.keys(data).length) {
            this.pedidos.push(data[this.i].mesa);
            this.i++;
          }
        }, error => {
        }
      )

    var x = this.resolveAfter2Seconds(10);

  }

  excluirQRCode() {

    this.i = 0;
    let config = JSON.parse(this.configService.getConfigData());

    while (this.i < this.qrcodes.length) {
      if (this.qrcodes[this.i].checked) {
        this.qrCodesExcluidos = this.qrcodes[this.i].qrCode;
      }
      this.i++;
    }

    this.qrcodeService.excluirQRCode(this.qrCodesExcluidos, config.access_token).subscribe(
      data => {
        this.i = 0;
        while (this.i < this.qrcodes.length) {
          if (this.qrcodes[this.i].checked) {
            this.qrcodes.splice(this.i, 1);
          }
          this.i++;
        }
        this.router.navigateByUrl("/empresa-tela-qrcode");
        this.presentAlert('Sabor excluído!', 'Sabor excluído com sucesso!');
      }, error => {
        if (error.status == 400) {
          let errorMessage: string = "";
          for (var i = 0; i < error.error.length; i++) {
            var obj = error.error[i];
            errorMessage = errorMessage + obj.mensagemUsuario + "<br>";
          }
          this.presentAlertError('Falha!', errorMessage);
        } else {
          this.presentAlertError('Falha!', 'Erro desconhecido.');
        }
      });
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {

        let config = JSON.parse(this.configService.getConfigData());
        this.uniqueArray = this.pedidos.filter((item, index) => this.pedidos.indexOf(item) === index);

        this.qrcodeService.buscarQRCodes(config.access_token)
          .subscribe(
            data => {
              this.i = 0;
              this.qrcodes = [];
              while (this.i < Object.keys(data).length) {
                while (this.j < Object.keys(this.uniqueArray).length) {
                  if (this.uniqueArray[this.j] == data[this.i].mesa) {
                    this.qrcodes.push({ qrCode: data[this.i].codigo, mesa: data[this.i].mesa, empresa: data[this.i].empresa, status: 1, checked: false });
                    this.j++;
                  } else {
                    this.qrcodes.push({ qrCode: data[this.i].codigo, mesa: data[this.i].mesa, empresa: data[this.i].empresa, status: 0, checked: false });
                    this.j++;
                  }
                  this.j++;
                }
                this.j = 0;
                this.i++;
              }
            }, error => {
            }
          )
      }, 200);
    });
  }

  async presentAlert(titleMsg: string, subTitleMsg: string) {
    const alert = await this.alertCtrl.create({
      header: titleMsg,
      subHeader: subTitleMsg,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigateByUrl("/empresa-tela-qrcode");
        }
      }
      ]
    });
    alert.present();
  }

  async presentAlertError(titleMsg: string, subTitleMsg: string) {
    const alert = await this.alertCtrl.create({
      header: titleMsg,
      subHeader: subTitleMsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  cadastrarQRCode() {
    this.router.navigate(['empresa-tela-edita-qrcode']);
  }

  imprimirQRCode() {
    this.i = 0;
    let config = JSON.parse(this.configService.getConfigData());

    while (this.i < this.qrcodes.length) {
      if (this.qrcodes[this.i].checked) {
        this.qrCodesExcluidos = this.qrcodes[this.i].qrCode;
      }
      this.i++;
    }

    window.open('https://chart.googleapis.com/chart?chs=350x350&cht=qr&chl='+'1:1');
  }

  ngOnInit() {
  }

}
