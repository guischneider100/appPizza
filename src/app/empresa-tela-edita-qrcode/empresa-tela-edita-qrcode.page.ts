import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { QrcodeService } from '../conexao/qrcode.service';

@Component({
  selector: 'app-empresa-tela-edita-qrcode',
  templateUrl: './empresa-tela-edita-qrcode.page.html',
  styleUrls: ['./empresa-tela-edita-qrcode.page.scss'],
  providers: [
    ConfiguracaoServService,
    QrcodeService
  ]
})
export class EmpresaTelaEditaQrcodePage implements OnInit {

  public cadastroForm: FormGroup;
  public config: any;

  infos = "";
  infosQRcode = "";
  messageMesa = "";
  errorMesa: boolean = false;

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    formBuilder: FormBuilder,
    public qrcodeService: QrcodeService,
    private alertCtrl: AlertController,
    public configService: ConfiguracaoServService) {

    this.cadastroForm = formBuilder.group({
      Mesa: ['', Validators.compose([Validators.required])]
    });

    this.config = JSON.parse(this.configService.getConfigData());
  }

  cadastrarQRCode() {

    let { Mesa } = this.cadastroForm.controls;

    if (!this.cadastroForm.valid) {

      if (!Mesa.valid) {
        if (Mesa.hasError('required')) {
          this.messageMesa = "A mesa é obrigatória";
        }
        this.errorMesa = true;
      } else {
        this.errorMesa = false;
        this.messageMesa = "";
      }

    } else {

      let qrcode = new QRcode();
      qrcode.mesa = this.cadastroForm.value.Mesa;
      qrcode.empresa = this.config.codigoEmpresa;
      qrcode.info = qrcode.mesa+":"+qrcode.empresa;

      this.qrcodeService.cadastraQRcode(qrcode, this.config.access_token)
        .subscribe(
          data => {
            this.presentAlert('QR Code cadastrado!', 'QR Code cadastrado com sucesso!');
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
          })
    }
  }

  async presentAlert(titleMsg: string, subTitleMsg: string) {
    const alert = await this.alertCtrl.create({
      header: titleMsg,
      subHeader: subTitleMsg,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['empresa-tela-qrcode']);
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

  ngOnInit() {
  }

}

class QRcode {
  info: string;
  mesa: string;
  empresa: number;
}
