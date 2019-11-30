import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { ConfiguracaoSisService } from '../conexao/configuracao-sis.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-empresa-tela-configuracoes',
  templateUrl: './empresa-tela-configuracoes.page.html',
  styleUrls: ['./empresa-tela-configuracoes.page.scss'],
  providers: [
    ConfiguracaoServService,
    ConfiguracaoSisService
  ]
})
export class EmpresaTelaConfiguracoesPage implements OnInit {

  public cadastroForm: FormGroup;
  messageImpressora = "";
  errorImpressora: boolean = false;

  constructor(formBuilder: FormBuilder,
    public configuracaoSisService: ConfiguracaoSisService,
    public configService: ConfiguracaoServService,
    private router: Router,
    private alertCtrl: AlertController) {
    this.cadastroForm = formBuilder.group({
      Impressora: ['', Validators.compose([Validators.required])]
    });
  }

  cadastrarConfigs() {

    let { Impressora } = this.cadastroForm.controls;

    if (!this.cadastroForm.valid) {

      if (!Impressora.valid) {
        if (Impressora.hasError('required')) {
          this.messageImpressora = "A informação da impressora é obrigatória";
        }
        this.errorImpressora = true;
      } else {
        this.errorImpressora = false;
        this.messageImpressora = "";
      }

    } else {

      let config = JSON.parse(this.configService.getConfigData());

      let configSis = new Config();
      configSis.impressora = this.cadastroForm.value.Impressora;
      configSis.empresa = config.codigoEmpresa;

      this.configuracaoSisService.cadastraConfigs(configSis, config.access_token)
        .subscribe(
          data => {
            this.presentAlert('Configurações alteradas!', 'Configurações alteradas com sucesso!');
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
          this.router.navigate(['empresa-tela-configuracoes']);
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

class Config {
  impressora: string;
  empresa: number;
}
