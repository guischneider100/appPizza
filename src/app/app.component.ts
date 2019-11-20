import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Pedidos',
      url: '/empresa-tela-principal',
      icon: 'md-paper'
    },
    {
      title: 'Sabores',
      url: '/empresa-tela-sabores',
      icon: 'md-pizza'
    },
    {
      title: 'QR Code',
      url: '/empresa-tela-qrcode',
      icon: 'md-barcode'
    },
    {
      title: 'Informações',
      url: '../empresa-tela-informacoes',
      icon: 'md-information-circle'
    },
    {
      title: 'Configurações',
      url: '/empresa-tela-configuracoes',
      icon: 'md-settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
    this.router.navigateByUrl("/tela-inicial");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#33000000");
      }
      this.splashScreen.hide();
    });
  }
}
