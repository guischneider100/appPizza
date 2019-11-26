import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioAutService {

  //private baseApiPath = "https://app-pizza-api-tcc.herokuapp.com";
  private baseApiPath = "http://192.168.0.106:8080";

  constructor(public http: HttpClient) {}

  getBaseAuth(usuario: string, senha: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let creds = 'client=angular'
      + '&username=' + usuario
      + '&password=' + senha
      + '&grant_type=password';

    return this.http.post(this.baseApiPath + "/oauth/token", creds, httpOptions);
  }

  cadastraUsuario(request: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseApiPath + "/usuario", request, httpOptions);
  }

}
