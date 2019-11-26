import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaboresService } from '../conexao/sabores.service';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';

@Component({
  selector: 'app-empresa-tela-edita-sabores',
  templateUrl: './empresa-tela-edita-sabores.page.html',
  styleUrls: ['./empresa-tela-edita-sabores.page.scss'],
  providers: [
    ConfiguracaoServService,
    SaboresService
  ]
})
export class EmpresaTelaEditaSaboresPage implements OnInit {

  public escondeTipoCadastrar: boolean = true;
  public iconeSalvar = "";
  infoListagem: any;
  informaValor: any;

  public cadastroForm: FormGroup;
  public config: any;
  public isEditando: boolean;
  public saborRetornado: any;

  NomeRetornado = "";
  IngredientesRetornados = "";
  CategoriaRetornado = "";
  FotoRetornado = "";

  messageNome = "";
  errorNome: boolean = false;
  messageCategoria = "";
  errorCategoria: boolean = false;

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    formBuilder: FormBuilder,
    public saboresService: SaboresService,
    private alertCtrl: AlertController,
    public configService: ConfiguracaoServService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        this.infoListagem = this.router.getCurrentNavigation().extras.state.tipoCadastro;

        if (this.infoListagem.tipo === "Cadastrar") {
          this.escondeTipoCadastrar = !this.escondeTipoCadastrar;
          this.iconeSalvar = "md-add-circle";
        } else {
          this.iconeSalvar = "md-checkmark-circle";
          this.isEditando = true;
          this.saborRetornado = JSON.parse(this.saboresService.getSabor());
          this.NomeRetornado = this.saborRetornado.nome;
          this.IngredientesRetornados = this.saborRetornado.ingredientes;
          this.CategoriaRetornado = this.saborRetornado.categoria;
          this.FotoRetornado = this.saborRetornado.foto;
        }

        this.cadastroForm = formBuilder.group({
          Nome: [this.NomeRetornado, Validators.compose([Validators.required, Validators.minLength(3)])],
          Ingredientes: [this.IngredientesRetornados],
          Categoria: [this.CategoriaRetornado, Validators.compose([Validators.required])],
          Foto: [this.FotoRetornado]
        });

        this.informaValor = {
          tipo: this.infoListagem.tipo
        };
      }
    });

    this.config = JSON.parse(this.configService.getConfigData());
  }

  async acaoToast() {
    if (this.infoListagem.tipo === "Cadastrar") {
      const toast = await this.toastController.create({
        cssClass: "padrao-toast",
        message: 'Sabor cadastrado com sucesso!',
        duration: 1000
      });
      this.router.navigate(['empresa-tela-sabores']);
      toast.present();
    } else {
      this.router.navigate(['empresa-tela-sabores']);
    }
  }

  cadastrarSabor() {

    let { Nome, Ingredientes, Categoria, Foto } = this.cadastroForm.controls;

    if (!this.cadastroForm.valid) {

      if (!Nome.valid) {
        if (Nome.hasError('minlength')) {
          this.messageNome = "O nome deve ter pelo menos 3 caracteres";
        }
        if (Nome.hasError('required')) {
          this.messageNome = "O nome é obrigatório";
        }
        this.errorNome = true;
      } else {
        this.errorNome = false;
        this.messageNome = "";
      }

      if (!Categoria.valid) {
        if (Categoria.hasError('required')) {
          this.messageCategoria = "A categoria é obrigatória";
        }
        this.errorCategoria = true;
      } else {
        this.errorCategoria = false;
        this.messageCategoria = "";
      }

    } else {

      let sabor = new Sabor();
      sabor.nome = this.cadastroForm.value.Nome;
      sabor.ingredientes = this.cadastroForm.value.Ingredientes;
      sabor.categoria = this.cadastroForm.value.Categoria;
      sabor.imagem = this.cadastroForm.value.Foto;
      sabor.status = 1;
      sabor.empresa = this.config.codigoEmpresa;

      if (this.isEditando) {
        console.log("Entrou editando");
        this.saboresService.editaSabor(sabor, this.config.access_token, this.saborRetornado.codigo)
          .subscribe(
            data => {
              this.presentAlert('Sabor Alterado!', 'Sabor alterado com sucesso!');
            }, error => {
              this.presentAlert('Falha!', error);
            }
          )
      } else {
        console.log("Entrou cadastrando");
        this.saboresService.cadastraSabor(sabor, this.config.access_token)
          .subscribe(
            data => {
              this.presentAlert('Sabor cadastrado!', 'Sabor cadastrado com sucesso!');
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
  }

  async presentAlert(titleMsg: string, subTitleMsg: string) {
    const alert = await this.alertCtrl.create({
      header: titleMsg,
      subHeader: subTitleMsg,
      buttons: [{
        text: 'OK',
        handler: () => {
          //this.router.navigate(['empresa-tela-sabores']);
          this.router.navigateByUrl("/empresa-tela-sabores");
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

class Sabor {
  nome: string;
  ingredientes: string;
  categoria: number;
  imagem: Blob;
  status: number;
  empresa: number;
}
