import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

let CONFIG_KEY_NAME = "SABOR";

@Injectable({
  providedIn: 'root'
})
export class SaboresService {

  private baseApiPath = "http://192.168.0.106:8080";
  public sabor: Object;

  constructor(public http: HttpClient) { }

  getSabor(): any {
    return localStorage.getItem(CONFIG_KEY_NAME);
  }

  setSabor(sabor?){  
    localStorage.setItem(CONFIG_KEY_NAME, JSON.stringify(sabor));
  }

  buscarSabores(access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
      })
    };

    return this.http.get(this.baseApiPath + "/sabor", httpOptions)
  }

  cadastraSabor(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseApiPath + "/sabor", request, httpOptions)
  }

  editaSabor(request: any, access_token: string, codigo: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(this.baseApiPath + "/sabor/" + codigo, request, httpOptions);
  }

  inativaSabor(body: number, access_token: string, codigo: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.baseApiPath + "/sabor/" + codigo + "/status", body, httpOptions);
  }

  excluirSabor(codigo: number, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
      })
    };

    return this.http.delete(this.baseApiPath + "/sabor/" + codigo, httpOptions)
  }
}
