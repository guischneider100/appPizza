import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

let CONFIG_KEY_NAME = "CONFIG";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoServService {

  private baseApiPath = "http://192.168.0.106:8080";

  constructor(public http: HttpClient) { }

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

  sair(access_token: string){
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + access_token,
        })
      };
  
      return this.http.delete(this.baseApiPath + "/tokens/revoke", httpOptions)
  }
}
