import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { CadastroService } from '../conexao/cadastro.service';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.page.html',
  styleUrls: ['./empresa-cadastro.page.scss'],
  providers: [
    ConfiguracaoServService,
    CadastroService
  ]
})
export class EmpresaCadastroPage implements OnInit {

  public cadastroForm: FormGroup;
  public config: any;
  public ultimoEmp: any;
  public emailCadastrado: any;

  codigoValidacao = "";

  messageRazaoSoc = "";
  errorRazaoSoc: boolean = false;
  messageNomeFant = "";
  errorNomeFant: boolean = false;
  messageCNPJ = "";
  errorCNPJ: boolean = false;
  messageCEP = "";
  errorCEP: boolean = false;
  messageUF = "";
  errorUF: boolean = false;
  messageEmail = "";
  errorEmail: boolean = false;
  messageLogin = "";
  errorLogin: boolean = false;
  messageSenha = "";
  errorSenha: boolean = false;

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    formBuilder: FormBuilder,
    public cadastroService: CadastroService,
    private alertCtrl: AlertController,
    public configService: ConfiguracaoServService) {
    this.cadastroForm = formBuilder.group({
      razaoSocial: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      nomeFantasia: ['', Validators.compose([Validators.minLength(3)])],
      CNPJ: ['', Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18)])],
      CEP: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      UF: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Login: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      Senha: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.config = JSON.parse(this.configService.getConfigData());
  }

  cadastrarEmpresa() {

    let { razaoSocial, nomeFantasia, CNPJ, CEP, UF, Email, Login, Senha} = this.cadastroForm.controls;

    if (!this.cadastroForm.valid) {

      if (!razaoSocial.valid) {
        if (razaoSocial.hasError('minlength')) {
          this.messageRazaoSoc = "A razão social deve ter pelo menos 3 caracteres";
        }
        if (razaoSocial.hasError('required')) {
          this.messageRazaoSoc = "A razão social é obrigatório";
        }
        this.errorRazaoSoc = true;
      } else {
        this.errorRazaoSoc = false;
        this.messageRazaoSoc = "";
      }

      if (!nomeFantasia.valid) {
        if (nomeFantasia.hasError('minlength')) {
          this.messageNomeFant = "O nome fantasia deve ter pelo menos 3 caracteres";
        }
        this.errorNomeFant = true;
      } else {
        this.errorNomeFant = false;
        this.messageNomeFant = "";
      }

      if (!CNPJ.valid) {
        if (CNPJ.hasError('maxlength') || CNPJ.hasError('minlength')) {
          this.messageCNPJ = "Digite o CNPJ sem pontos ou verifique se está correto";
        }
        if (CNPJ.hasError('required')) {
          this.messageCNPJ = "O CNPJ é obrigatório";
        }
        this.errorCNPJ = true;
      } else {
        this.errorCNPJ = false;
        this.messageCNPJ = "";
      }

      if (!CEP.valid) {
        if (CEP.hasError('maxlength') || CEP.hasError('minlength')) {
          this.messageCEP = "Digite o CEP sem pontos ou verifique se está correto";
        }
        if (CEP.hasError('required')) {
          this.messageCEP = "O CEP é obrigatório";
        }
        this.errorCEP = true;
      } else {
        this.errorCEP = false;
        this.messageCEP = "";
      }

      if (!UF.valid) {
        if (UF.hasError('maxlength') || UF.hasError('minlength')) {
          this.messageUF = "Verifique se a UF está correta";
        }
        if (UF.hasError('required')) {
          this.messageUF = "A UF é obrigatória";
        }
        this.errorUF = true;
      } else {
        this.errorUF = false;
        this.messageUF = "";
      }

      if (!Email.valid) {
        if (Email.hasError('email')) {
          this.messageEmail = "E-mail não é valido";
        }
        if (Email.hasError('required')) {
          this.messageEmail = "E-mail é obrigatório";
        }
        this.errorEmail = true;
      } else {
        this.errorEmail = false;
        this.messageEmail = "";
      }

      if (!Login.valid) {
        if (Login.hasError('minlength')) {
          this.messageLogin = "O login deve ter pelo menos 4 caracteres";
        }
        if (Login.hasError('required')) {
          this.messageLogin = "O login é obrigatório";
        }
        this.errorLogin = true;
      } else {
        this.errorLogin = false;
        this.messageLogin = "";
      }

      if (!Senha.valid) {
        if (Senha.hasError('minlength')) {
          this.messageSenha = "A senha deve ter pelo menos 4 caracteres";
        }
        if (Senha.hasError('required')) {
          this.messageSenha = "A senha é obrigatória";
        }
        this.errorSenha = true;
      } else {
        this.errorSenha = false;
        this.messageSenha = "";
      }

    } else {

      let empresa = new Empresa();
      let usuario = new Usuario();
      empresa.razaoSocial = this.cadastroForm.value.razaoSocial;
      empresa.nome = this.cadastroForm.value.nomeFantasia;
      empresa.cnpj = this.cadastroForm.value.CNPJ;
      empresa.cep = this.cadastroForm.value.CEP;
      empresa.uf = this.cadastroForm.value.UF;
      empresa.email = this.cadastroForm.value.Email;
      empresa.usuario = 1;
      this.codigoValidacao = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(5, 8);
      empresa.codValidacao = this.codigoValidacao.toUpperCase();
      usuario.login = this.cadastroForm.value.Login;
      usuario.senha = this.cadastroForm.value.Senha;

      this.cadastroService.cadastraEmpresa(empresa, this.config.access_token)
        .subscribe(
          data => {
            this.ultimoEmp = data;

            this.emailCadastrado = data;
            this.enviarEmail(empresa.codValidacao, this.emailCadastrado.email);

            usuario.empresa = this.ultimoEmp.codigo;

            this.cadastroService.cadastraUsuario(usuario, this.config.access_token)
              .subscribe(
                data => {
                  this.presentAlert('Empresa cadastrada!', 'Empresa cadastrada com sucesso!');
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
          this.router.navigate(['empresa-cadastro-email']);
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
            this.router.navigate(['empresa-cadastro']);
          }
        }
      ]
    });
    alert.present();
  }

  public enviarEmail(codigo, emailCadastrado) {
    //Fazer
  }

  ngOnInit() {
  }

}

class Empresa {
  razaoSocial: string;
  nome: string;
  cnpj: string;
  cep: string;
  uf: string;
  email: string;
  codValidacao: string;
  usuario: number;
}

class Usuario {
  login: string;
  senha: string;
  empresa: number;
}