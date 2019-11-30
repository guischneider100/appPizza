import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SaboresService } from '../conexao/sabores.service';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-empresa-tela-sabores',
  templateUrl: './empresa-tela-sabores.page.html',
  styleUrls: ['./empresa-tela-sabores.page.scss'],
  providers: [
    ConfiguracaoServService,
    SaboresService
  ]
})
export class EmpresaTelaSaboresPage implements OnInit {

  public sabores: any;
  public empresa: any;

  i = 0;

  constructor(private router: Router,
    public saboresService: SaboresService,
    public configService: ConfiguracaoServService,
    public alertController: AlertController) {
  }

  ionViewWillEnter() {
    let config = JSON.parse(this.configService.getConfigData());
    this.empresa = config.codigoEmpresa;
    this.saboresService.buscarSabores(config.access_token)
      .subscribe(
        data => {
            this.sabores = data;
        }, error => {
        }
      )
  }

  tipoCadastroCadas = {
    tipo: "Cadastrar"
  };

  tipoCadastroSalvar = {
    tipo: "Salvar"
  };

  cadastrarSabor() {
    let navigationExtras: NavigationExtras = {
      state: {
        tipoCadastro: this.tipoCadastroCadas
      }
    };

    this.router.navigate(['empresa-tela-edita-sabores'], navigationExtras);
  }

  editarSabor(sabor) {
    let navigationExtras: NavigationExtras = {
      state: {
        tipoCadastro: this.tipoCadastroSalvar
      }
    };

    this.saboresService.setSabor(sabor);

    this.router.navigate(['empresa-tela-edita-sabores'], navigationExtras);
  }

  ngOnInit() {
  }

}

class Sabor {
  status: number;
}
