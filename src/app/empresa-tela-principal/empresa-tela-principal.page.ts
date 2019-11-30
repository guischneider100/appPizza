import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { PedidoService } from '../conexao/pedido.service';

@Component({
  selector: 'app-empresa-tela-principal',
  templateUrl: './empresa-tela-principal.page.html',
  styleUrls: ['./empresa-tela-principal.page.scss'],
  providers: [
    ConfiguracaoServService,
    PedidoService
  ]
})
export class EmpresaTelaPrincipalPage implements OnInit {

  public pedidos = [];
  public clientes = [];
  public sabores = [];
  public empresa: any;
  public terms = "";
  public podeFinalizarPedido = false;

  private pedidosFinalizados: number;

  i = 0;
  j = 0;
  k = 0;
  l = 0;
  m = 0;

  constructor(public menuCtrl: MenuController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController,
    public pedidoService: PedidoService,
    public configService: ConfiguracaoServService) {
    this.menuCtrl.enable(true);

    setInterval(() => {
      this.ngOnInit();
    }, 5000);

    setInterval(() => {
      this.i = 0;
      this.podeFinalizarPedido = false;
      while (this.i < this.pedidos.length) {
        if (this.pedidos[this.i].checked) {
          this.podeFinalizarPedido = true;
        }
        this.i++;
      }
    }, 100);
  }

  ngOnInit() {
    let config = JSON.parse(this.configService.getConfigData());
    this.pedidoService.buscarClientes()
      .subscribe(
        data => {
          while (this.l < Object.keys(data).length) {
            this.clientes.push({ cliCod: data[this.l].codigo, nome: data[this.l].nome });
            this.l++;
          }
        }, error => {
        }
      )

    this.pedidoService.buscarSabores(config.access_token)
      .subscribe(
        data2 => {
          while (this.m < Object.keys(data2).length) {
            this.sabores.push({ sabCod: data2[this.m].codigo, nome: data2[this.m].nome });
            this.m++;
          }
        }, error => {
        }
      )

    this.empresa = config.codigoEmpresa;
    this.pedidoService.buscarPedidos(config.access_token)
      .subscribe(
        data3 => {
          this.pedidos = [];
          while (this.i < Object.keys(data3).length) {
            while (this.j < Object.keys(this.clientes).length) {
              if (data3[this.i].cliente == this.clientes[this.j].cliCod) {
                while (this.k < Object.keys(this.sabores).length) {
                  if (data3[this.i].sabor == this.sabores[this.k].sabCod) {
                    this.pedidos.push({ pedCod: data3[this.i].codigo, mesa: data3[this.i].mesa, sabor: this.sabores[this.k].nome, cliente: this.clientes[this.j].nome, empresa: data3[this.i].empresa, status: data3[this.i].status, checked: false });
                    this.k++;
                  } else {
                    this.k++;
                  }
                }
                this.j++;
              } else {
                this.j++;
              }
            }
            this.k = 0;
            this.j = 0;
            this.i++;
          }
        }, error => {
        }
      )
  }

  async sair() {
    const alert = await this.alertController.create({
      header: 'Você realmente deseja sair?',
      cssClass: 'ion-alert',
      buttons: ['Cancelar', {
        text: 'Sair',
        handler: () => {
          let config = JSON.parse(this.configService.getConfigData());
          this.configService.sair(config.access_token)
            .subscribe(
              data => {
                this.router.navigate(['empresa-login']);
              }, error => {
              })
        }
      }]
    });
    await alert.present();
  }

  ionViewWillEnter() {
  }

  finalizarPedido() {

    this.i = 0;

    while (this.i < this.pedidos.length) {
      if (this.pedidos[this.i].checked) {
        this.pedidosFinalizados = this.pedidos[this.i].pedCod;
      }
      this.i++;
    }

    let pedido = new Pedido();
    pedido.status = 0;

    let config = JSON.parse(this.configService.getConfigData());
    this.pedidoService.finalizarPedidos(pedido.status, config.access_token, this.pedidosFinalizados)
      .subscribe(
        data => {
          this.i = 0;
          while (this.i < this.pedidos.length) {
            if (this.pedidos[this.i].checked) {
              this.pedidos.splice(this.i, 1);
            }
            this.i++;
          }
          this.terms = "";
          this.router.navigate(['empresa-tela-principal']);
          this.presentAlert('Pedidos finalizados!', 'Pedidos finalizados com sucesso!');
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

}

class Pedido {
  status: number;
}
