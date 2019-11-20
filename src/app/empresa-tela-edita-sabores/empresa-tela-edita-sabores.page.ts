import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-empresa-tela-edita-sabores',
  templateUrl: './empresa-tela-edita-sabores.page.html',
  styleUrls: ['./empresa-tela-edita-sabores.page.scss'],
})
export class EmpresaTelaEditaSaboresPage implements OnInit {

  public escondeTipoCadastrar: boolean = true;
  public iconeSalvar = "";
  infoListagem: any;
  informaValor: any;

  constructor(private route: ActivatedRoute, public toastController: ToastController, private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        this.infoListagem = this.router.getCurrentNavigation().extras.state.tipoCadastro;

        if(this.infoListagem.tipo === "Cadastrar"){
          this.escondeTipoCadastrar = !this.escondeTipoCadastrar;
          this.iconeSalvar = "md-add-circle";
        }else{
          this.iconeSalvar = "md-checkmark-circle";
        }

        this.informaValor = {
          tipo: this.infoListagem.tipo
        };
      }
    });
  }

  async acaoToast() {
    if(this.infoListagem.tipo === "Cadastrar"){
      const toast = await this.toastController.create({
        cssClass: "padrao-toast",
        message: 'Sabor cadastrado com sucesso!',
        duration: 1000 
      });
      this.router.navigate(['empresa-tela-sabores']);
      toast.present();
    }else{
      this.router.navigate(['empresa-tela-sabores']);
    }
  }

  ngOnInit() {
  }

}
