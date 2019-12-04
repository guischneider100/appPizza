import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { UsuarioAutService } from '../conexao/usuario-aut.service';
import { ClienteService } from '../conexao/cliente.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  public cadastroForm: FormGroup;

  messageNomeCliente = "";
  errorNomeCliente: boolean = false;

  constructor(private router: Router,
    public configService: ConfiguracaoServService,
    public usuarioAutenticacaoProvider: UsuarioAutService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder) {
      
    if (this.router.getCurrentNavigation().extras.state) {
      this.infoListagem = this.router.getCurrentNavigation().extras.state;
    }

    this.cadastroForm = formBuilder.group({
      nomeCliente: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
    
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

    let { nomeCliente } = this.cadastroForm.controls;

    if (!this.cadastroForm.valid) {

      if (!nomeCliente.valid) {
        if (nomeCliente.hasError('minlength')) {
          this.messageNomeCliente = "O nome deve ter pelo menos 3 caracteres";
        }
        if (nomeCliente.hasError('required')) {
          this.messageNomeCliente = "O nome é obrigatório";
        }
        this.errorNomeCliente = true;
      } else {
        this.errorNomeCliente = false;
        this.messageNomeCliente = "";
      }

    } else {

    let cliente = new Cliente();
    cliente.nome = this.cadastroForm.value.nomeCliente;
    cliente.mesa = this.infoListagem.qrCodeMesa;
    cliente.status = 1;
    cliente.empresa = this.infoListagem.qrCodeEmpresa;

    this.clienteService.cadastarCliente(cliente, this.config.access_token)
    .subscribe(
      data => {
        this.codCliente = data;

        let navigationExtras: NavigationExtras = {
          state: {
            clienteCod: this.codCliente.codigo
          }
        };

        this.router.navigate(['cliente-tela-principal'], navigationExtras);
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
