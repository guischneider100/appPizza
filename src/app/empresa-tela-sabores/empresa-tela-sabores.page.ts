import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-empresa-tela-sabores',
  templateUrl: './empresa-tela-sabores.page.html',
  styleUrls: ['./empresa-tela-sabores.page.scss'],
})
export class EmpresaTelaSaboresPage implements OnInit {

  constructor(private router: Router) { }

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

  editarSabor() {
    let navigationExtras: NavigationExtras = {
      state: {
        tipoCadastro: this.tipoCadastroSalvar
      }
    };
    this.router.navigate(['empresa-tela-edita-sabores'], navigationExtras);
  }

  ngOnInit() {
  }

}
