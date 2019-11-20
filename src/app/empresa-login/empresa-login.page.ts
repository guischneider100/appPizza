import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-login',
  templateUrl: './empresa-login.page.html',
  styleUrls: ['./empresa-login.page.scss'],
})
export class EmpresaLoginPage implements OnInit {

  public tipoSenha: String = "password";
  public mostraSenha: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public mostrarSenha(){
    if(this.mostraSenha){
      this.mostraSenha = false;
      this.tipoSenha = "password";
    }else{
      this.mostraSenha = true;
      this.tipoSenha = "text";
    }
  }

}
