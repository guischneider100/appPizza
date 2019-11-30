import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaboresService } from '../conexao/sabores.service';
import { ConfiguracaoServService } from '../conexao/configuracao-serv.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-empresa-tela-edita-sabores',
  templateUrl: './empresa-tela-edita-sabores.page.html',
  styleUrls: ['./empresa-tela-edita-sabores.page.scss'],
  providers: [
    ConfiguracaoServService,
    SaboresService,
    File
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
  public categorias: any;
  public categoriasTd: any;

  NomeRetornado = "";
  IngredientesRetornados = "";
  CategoriaRetornado = "";
  FotoRetornado = "";
  statusSaborRetornado = "";

  messageNome = "";
  errorNome: boolean = false;
  messageCategoria = "";
  errorCategoria: boolean = false;
  imagemSabor: String;

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    formBuilder: FormBuilder,
    public saboresService: SaboresService,
    private alertCtrl: AlertController,
    public configService: ConfiguracaoServService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File) {

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
          this.statusSaborRetornado = this.saborRetornado.status;
        }

        this.categorias = [
          { id: 1, name: 'Salgada' },
          { id: 2, name: 'Doce' },
          { id: 3, name: 'Vegetariana' },
        ];
        this.categoriasTd = [this.categorias[this.CategoriaRetornado]];

        this.cadastroForm = formBuilder.group({
          Nome: [this.NomeRetornado, Validators.compose([Validators.required, Validators.minLength(3)])],
          Ingredientes: [this.IngredientesRetornados],
          Categoria: [this.CategoriaRetornado, Validators.compose([Validators.required])]
        });

        this.informaValor = {
          tipo: this.infoListagem.tipo
        };
      }
    });

    this.imagemSabor = "../../assets/padrao-pizza-salgada.jpg";
    this.config = JSON.parse(this.configService.getConfigData());
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
      sabor.imagem;
      sabor.status = 1;
      sabor.empresa = this.config.codigoEmpresa;

      if (this.isEditando) {
        this.saboresService.editaSabor(sabor, this.config.access_token, this.saborRetornado.codigo)
          .subscribe(
            data => {
              this.presentAlert('Sabor Alterado!', 'Sabor alterado com sucesso!');
            }, error => {
              this.presentAlert('Falha!', error);
            }
          )
      } else {
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

  excluirSabor() {

    this.saboresService.excluirSabor(this.saborRetornado.codigo, this.config.access_token).subscribe(
      data => {
        this.router.navigateByUrl("/empresa-tela-sabores");
        this.presentAlert('Sabor excluído!', 'Sabor excluído com sucesso!');
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
      });
    this.router.navigateByUrl("/empresa-tela-sabores");
  }

  inativarAtivarSabor() {

    let sabor = new Sabor();
    if (this.statusSaborRetornado == "1") {
      sabor.status = 0;
    } else {
      sabor.status = 1;
    }

    let config = JSON.parse(this.configService.getConfigData());
    this.saboresService.inativaSabor(sabor.status, config.access_token, this.saborRetornado.codigo)
      .subscribe(
        data => {
          this.router.navigateByUrl("/empresa-tela-sabores");
          this.presentAlert('Sabor ativado/inativado!', 'Sabor ativado/inativado com sucesso!');
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

  pegaFotoSabor(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imagemSabor = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  async pegarFotoSabor() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pegaFotoSabor(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pegaFotoSabor(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      header: "Excluir?",
      message: "Deseja realmente excluir esse sabor?",
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Excluir',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  async presentAlert(titleMsg: string, subTitleMsg: string) {
    const alert = await this.alertCtrl.create({
      header: titleMsg,
      subHeader: subTitleMsg,
      buttons: [{
        text: 'OK',
        handler: () => {
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
