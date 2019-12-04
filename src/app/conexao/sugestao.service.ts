import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class SugestaoService {

  private baseApiPath;

  constructor(public http: HttpClient,
    public ip: IpService) { this.baseApiPath = ip.getIP(); }

  enviarSugestao(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseApiPath + "/sugestao", request, httpOptions)
  }

  buscarSugestoes(access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(this.baseApiPath + "/sugestao", httpOptions)
  }

  buscarInformacoes(dataIni: string, dataFim: string, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(this.baseApiPath + "/pedido?dataClientePedDe=" + dataIni + "&dataClientePedAte=" + dataFim, httpOptions)
  }

  finalizarSugestoes(body: number, access_token: string, codigo: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.baseApiPath + "/sugestao/" + codigo + "/status", body, httpOptions);
  }
}
