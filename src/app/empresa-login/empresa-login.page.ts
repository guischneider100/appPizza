import { Component, OnInit } from '@angular/core';
import { UsuarioAutService } from '../conexao/usuario-aut.service';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-login',
  templateUrl: './empresa-login.page.html',
  providers: [
    UsuarioAutService,
    ConfiguracaoServService
  ],
  styleUrls: ['./empresa-login.page.scss'],
})
export class EmpresaLoginPage implements OnInit {

  public loginUsuario: string;
  public loginSenha: string;
  public access_token: any;
  public config: any;
  public loader;

  public tipoSenha: String = "password";
  public mostraSenha: boolean = false;

  constructor(public usuarioAutenticacaoProvider: UsuarioAutService, public configServ: ConfiguracaoServService, private toastController: ToastController,
    public alertCtrl: AlertController, private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  login() {
    this.abreCarregando();

    this.usuarioAutenticacaoProvider.getBaseAuth(this.loginUsuario, this.loginSenha)
      .subscribe(
        data => {
          this.access_token = data;
          this.config = JSON.parse(this.configServ.getConfigData());
          this.configServ.setConfigData(this.access_token.access_token, this.access_token.codigoEmpresa);
          this.router.navigate(['empresa-tela-principal']);
          this.fechaCarregando();
        }, error => {
          if (error.status == 400) {
            this.fechaCarregando();
            this.presentToast();
          } else {
            this.fechaCarregando();
            this.showAlert(JSON.stringify(error));
          }
        }
      )
  }

  async presentToast() {
    const toast = await this.toastController.create({
      cssClass: "padrao-toast",
      message: 'Erro de autenticação!',
      duration: 3000
    });

    toast.present();
  }

  async abreCarregando() {
    this.loader = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
      translucent: true
    });
    await this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  async showAlert(erro: any) {
    const alert = await this.alertCtrl.create({
      header: 'Falha!',
      subHeader: 'Ocorreu um erro inesperado ' + erro,
      buttons: ['OK']
    });
    await alert.present();
  }

  public mostrarSenha() {
    if (this.mostraSenha) {
      this.mostraSenha = false;
      this.tipoSenha = "password";
    } else {
      this.mostraSenha = true;
      this.tipoSenha = "text";
    }
  }

}
