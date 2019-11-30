import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { UsuarioAutService } from '../conexao/usuario-aut.service';
import { ClienteService } from '../conexao/cliente.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-nome',
  templateUrl: './cliente-nome.page.html',
  styleUrls: ['./cliente-nome.page.scss'],
  providers: [
    ConfiguracaoServService,
    ClienteService
  ]
})
export class ClienteNomePage implements OnInit {

  infoListagem: any;
  public access_token: any;
  public config: any;
  public nomeCliente: string;
  public codCliente: any;

  constructor(private router: Router,
    public configService: ConfiguracaoServService,
    public usuarioAutenticacaoProvider: UsuarioAutService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
      
    if (this.router.getCurrentNavigation().extras.state) {
      this.infoListagem = this.router.getCurrentNavigation().extras.state;
    }
    
  }

  continuarNome() {

    this.usuarioAutenticacaoProvider.getBaseAuth("cliente", "cliente")
      .subscribe(
        data => {
          this.access_token = data;
          this.config = JSON.parse(this.configService.getConfigData());
          this.configService.setConfigData(this.access_token.access_token, this.infoListagem.qrCodeEmpresa);
          this.cadastrarCliente();
        }
      )

  }

  cadastrarCliente() {
    let cliente = new Cliente();
    cliente.nome = this.nomeCliente;
    cliente.mesa = this.infoListagem.qrCodeMesa;
    cliente.status = 1;
    cliente.empresa = this.infoListagem.qrCodeEmpresa;

    this.clienteService.cadastarCliente(cliente, this.config.access_token)
    .subscribe(
      data => {
        this.codCliente = data;
        this.presentAlert('Cliente cadastrado!', 'Cliente cadastrado com sucesso!');
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
    const alert = await this.alertCtrl.create({
      header: titleMsg,
      subHeader: subTitleMsg,
      buttons: [{
        text: 'OK',
        handler: () => {

          let navigationExtras: NavigationExtras = {
            state: {
              clienteCod: this.codCliente.codigo
            }
          };

          this.router.navigate(['cliente-tela-principal'], navigationExtras);
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

class Cliente {
  nome: String;
  mesa: number;
  status: number;
  empresa: number;
}
