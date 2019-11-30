import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { SugestaoService } from 'src/app/conexao/sugestao.service';
import { ConfiguracaoServService } from 'src/app/conexao/configuracao-serv.service';

@Component({
  selector: 'app-tab-sugestoes',
  templateUrl: './tab-sugestoes.page.html',
  styleUrls: ['./tab-sugestoes.page.scss'],
  providers: [
    ConfiguracaoServService,
    SugestaoService
  ]
})
export class TabSugestoesPage implements OnInit {

  i = 0;
  public sugestoes = [];
  public empresa: any;

  public podeFinalizarSugestao = false;

  private sugestoesFinalizadas: number;

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    public sugestaoService: SugestaoService,
    public configService: ConfiguracaoServService,
    public alertController: AlertController
  ) {

    setInterval(() => {
      this.i = 0;
      this.podeFinalizarSugestao = false;
      while (this.i < this.sugestoes.length) {
        if (this.sugestoes[this.i].checked) {
          this.podeFinalizarSugestao = true;
        }
        this.i++;
      }
    }, 100);

  }

  finalizarSugestao() {

    this.i = 0;

    while (this.i < this.sugestoes.length) {
      if (this.sugestoes[this.i].checked) {
        this.sugestoesFinalizadas = this.sugestoes[this.i].sugCod;
      }
      this.i++;
    }

    let sugestao = new Sugestao();
    sugestao.status = 0;

    let config = JSON.parse(this.configService.getConfigData());
    this.sugestaoService.finalizarSugestoes(sugestao.status, config.access_token, this.sugestoesFinalizadas)
      .subscribe(
        data => {
          this.i = 0;
          while (this.i < this.sugestoes.length) {
            if (this.sugestoes[this.i].checked) {
              this.sugestoes.splice(this.i, 1);
            }
            this.i++;
          }
          this.router.navigate(['empresa-tela-principal']);
          this.presentAlert('Sugestões finalizadas!', 'Sugestões finalizadas com sucesso!');
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

  async presentAlert(titleMsg: string, subTitleMsg: string) {
    const alert = await this.alertController.create({
      header: titleMsg,
      subHeader: subTitleMsg,
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      }
      ]
    });
    alert.present();
  }

  async presentAlertError(titleMsg: string, subTitleMsg: string) {
    const alert = await this.alertController.create({
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
    let config = JSON.parse(this.configService.getConfigData());
    this.empresa = config.codigoEmpresa;

    this.sugestaoService.buscarSugestoes(config.access_token)
      .subscribe(
        data => {
          while (this.i < Object.keys(data).length) {
            this.sugestoes.push({ sugCod: data[this.i].codigo, info: data[this.i].info, status: data[this.i].status, empresa: data[this.i].empresa, checked: false });
            this.i++;
          }
        }, error => {
        }
      )
  }

}

class Sugestao {
  status: number;
}
