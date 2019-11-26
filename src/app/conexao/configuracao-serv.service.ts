import { Injectable } from '@angular/core';

let CONFIG_KEY_NAME = "CONFIG";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoServService {

  private config = {
    access_token: "",
    codigoEmpresa: ""
  };

  constructor() { }

  getConfigData(): any {
    return localStorage.getItem(CONFIG_KEY_NAME);
  }

  setConfigData(access_token?: string, codigoEmpresa?: string){
    let config = {
      access_token: access_token,
      codigoEmpresa: codigoEmpresa
    };
    
    //localStorage esta no html5 entao eu acesso de qualquer lugar.
    localStorage.setItem(CONFIG_KEY_NAME, JSON.stringify(config));
  }
}
