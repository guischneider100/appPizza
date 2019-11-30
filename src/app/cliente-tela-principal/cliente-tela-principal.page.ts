import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { UsuarioAutService } from '../conexao/usuario-aut.service';
import { PedidoService } from '../conexao/pedido.service';
import { SugestaoService } from '../conexao/sugestao.service';

@Component({
  selector: 'app-cliente-tela-principal',
  templateUrl: './cliente-tela-principal.page.html',
  styleUrls: ['./cliente-tela-principal.page.scss'],
  providers: [
    ConfiguracaoServService,
    PedidoService,
    SugestaoService
  ]
})
export class ClienteTelaPrincipalPage implements OnInit {

  public escondePrimeiro: boolean = false;
  public escondeSegundo: boolean = true;

  public access_token: any;
  public cliente: any;
  public config: any;

  garcomAberto = false;

  public sabores = [];
  public pedidosAbertos = 0;
  public podeFazerPedido = false;
  public categoria: number;
  public saborEscolhido: number;
  public empresa: any;

  infoListagem: any;
  i = 0;

  cat1: boolean = false;
  cat2: boolean = false;
  cat3: boolean = false;

  constructor(public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public toastController: ToastController,
    private router: Router,
    public pedidoService: PedidoService,
    public sugestaoService: SugestaoService,
    public configService: ConfiguracaoServService,
    public usuarioAutenticacaoProvider: UsuarioAutService) {

    this.menuCtrl.enable(false);

    if (this.router.getCurrentNavigation().extras.state) {
      this.infoListagem = this.router.getCurrentNavigation().extras.state;
    }

    setInterval(() => {
      let config = JSON.parse(this.configService.getConfigData());
      this.empresa = config.codigoEmpresa;
      this.pedidoService.buscarPedidos(config.access_token)
        .subscribe(
          data => {
            this.i = 0;
            this.pedidosAbertos = 0;
            this.garcomAberto = false;
            while (this.i < Object.keys(data).length) {
              if (this.infoListagem.clienteCod == data[this.i].cliente && this.empresa == data[this.i].empresa && data[this.i].status == 1 && data[this.i].sabor != 1000) {
                this.pedidosAbertos++;
              }
              if (this.infoListagem.clienteCod == data[this.i].cliente && this.empresa == data[this.i].empresa && data[this.i].status == 1 && data[this.i].sabor == 1000) {
                this.garcomAberto = true;
              }
              this.i++;
            }
          }, error => {
          }
        )
    }, 5000);

    setInterval(() => {
      this.i = 0;
      this.podeFazerPedido = false;
      while (this.i < this.sabores.length) {
        if (this.sabores[this.i].checked) {
          this.podeFazerPedido = true;
        }
        this.i++;
      }
    }, 100);
  }

  ionViewWillEnter() {

    let config = JSON.parse(this.configService.getConfigData());
    this.empresa = config.codigoEmpresa;
    this.pedidoService.buscarSabores(config.access_token)
      .subscribe(
        data => {
          while (this.i < Object.keys(data).length) {
            if (1 == data[this.i].categoria && this.empresa == data[this.i].empresa) {
              this.cat1 = true;
            } else if (2 == data[this.i].categoria && this.empresa == data[this.i].empresa) {
              this.cat2 = true;
            } else if (3 == data[this.i].categoria && this.empresa == data[this.i].empresa) {
              this.cat3 = true;
            }
            this.sabores.push({ saborCod: data[this.i].codigo, nome: data[this.i].nome, ingredientes: data[this.i].ingredientes, categoria: data[this.i].categoria, empresa: data[this.i].empresa, checked: false });
            this.i++;
          }
        }, error => {
        }
      )

    this.pedidoService.buscarCliente(config.access_token, this.infoListagem.clienteCod)
      .subscribe(
        data => {
          this.cliente = data;
        }, error => {
        }
      )
  }

  fazerPedido(garcom) {

    this.i = 0;

    while (this.i < this.sabores.length) {
      if (this.sabores[this.i].checked) {
        this.saborEscolhido = this.sabores[this.i].saborCod;
        this.sabores[this.i].checked = false;
      }
      this.i++;
    }

    let pedido = new Pedido();
    pedido.cliente = this.infoListagem.clienteCod;
    pedido.mesa = this.cliente.mesa;
    if (garcom == "Chamada do Garçom") {
      pedido.sabor = 1000;
    } else {
      pedido.sabor = this.saborEscolhido;
    }
    pedido.status = 1;
    var now = new Date;
    pedido.data = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-" + now.getDate().toString();
    pedido.empresa = this.empresa;

    let config = JSON.parse(this.configService.getConfigData());

    this.pedidoService.enviarPedido(pedido, config.access_token)
      .subscribe(
        data => {
          this.presentAlert('Pedido enviado!', 'Pedido enviado com sucesso!');
          this.pedidoService.buscarPedidos(config.access_token)
            .subscribe(
              data => {
                this.i = 0;
                this.pedidosAbertos = 0;
                this.garcomAberto = false;
                while (this.i < Object.keys(data).length) {
                  if (this.infoListagem.clienteCod == data[this.i].cliente && this.empresa == data[this.i].empresa && data[this.i].status == 1 && data[this.i].sabor != 1000) {
                    this.pedidosAbertos++;
                  }
                  if (this.infoListagem.clienteCod == data[this.i].cliente && this.empresa == data[this.i].empresa && data[this.i].status == 1 && data[this.i].sabor == 1000) {
                    this.garcomAberto = true;
                  }
                  this.i++;
                }
              }, error => {
              }
            )
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

  fazerSugestao(info) {

    let sugestao = new Sugestao();
    sugestao.info = info;
    sugestao.status = 1;
    var now = new Date;
    sugestao.data = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-" + now.getDate().toString();
    sugestao.cliente = this.infoListagem.clienteCod;
    sugestao.empresa = this.empresa;

    let config = JSON.parse(this.configService.getConfigData());

    this.sugestaoService.enviarSugestao(sugestao, config.access_token)
      .subscribe(
        data => {
          this.presentAlert('Sugestão enviada!', 'Sugestão enviada com sucesso!');
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
          this.router.navigateByUrl("/cliente-tela-principal");
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

  public listaSaboresCategoria(categoria) {
    this.escondePrimeiro = !this.escondePrimeiro;
    this.escondeSegundo = !this.escondeSegundo;
    this.categoria = categoria;
  }

  async chamarGarcon() {
    const alert = await this.alertCtrl.create({
      header: 'Deseja chamar o Garçom?',
      buttons: ['Cancelar', {
        text: 'Chamar',
        handler: () => {
          this.fazerPedido("Chamada do Garçom");
        }
      }]
    });
    await alert.present();
  }

  async enviarSugestao() {
    const alert = await this.alertCtrl.create({
      header: 'Envie sua dica, reclamação ou sugestão:',
      cssClass: 'ion-alert',
      inputs: [
        {
          name: 'sug',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Enviar',
          handler: info => {
            this.fazerSugestao(info.sug.toString());
          }
        }
      ]
    });
    await alert.present();
  }

  async sair() {
    const alert = await this.alertCtrl.create({
      header: 'Você realmente deseja sair?',
      cssClass: 'ion-alert',
      buttons: ['Cancelar', {
        text: 'Sair',
        handler: () => {
          let config = JSON.parse(this.configService.getConfigData());
          this.configService.sair(config.access_token)
            .subscribe(
              data => {
                this.router.navigate(['cliente-qrcode']);
              }, error => {
              })
        }
      }]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}

class Pedido {
  cliente: number;
  mesa: number;
  sabor: number;
  status: number;
  data: String;
  empresa: number;
}

class Sugestao {
  info: String;
  status: number;
  data: String;
  cliente: number;
  empresa: number;
}