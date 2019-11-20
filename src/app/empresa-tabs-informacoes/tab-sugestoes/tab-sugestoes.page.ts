import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab-sugestoes',
  templateUrl: './tab-sugestoes.page.html',
  styleUrls: ['./tab-sugestoes.page.scss'],
})
export class TabSugestoesPage implements OnInit {

  constructor(private route: ActivatedRoute, public toastController: ToastController, private router: Router) { }

  async acaoToast() {
    const toast = await this.toastController.create({
      cssClass: "padrao-toast",
      message: 'Sugestão(ões) resolvida(s) com sucesso!',
      duration: 1000
    });
    this.router.navigate(['empresa-tela-informacoes']);
    toast.present();
  }

  ngOnInit() {
  }

}
