import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-nome',
  templateUrl: './cliente-nome.page.html',
  styleUrls: ['./cliente-nome.page.scss'],
})
export class ClienteNomePage implements OnInit {

  infoListagem: any;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.infoListagem = this.router.getCurrentNavigation().extras.state.qrCodeMesa;
    }
  }

  ngOnInit() {
  }

}
