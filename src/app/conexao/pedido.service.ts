import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseApiPath;

  constructor(public http: HttpClient,
    public ip: IpService) { this.baseApiPath = ip.getIP(); }

  enviarPedido(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseApiPath + "/pedido", request, httpOptions)
  }

  buscarPedidos(access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(this.baseApiPath + "/pedido", httpOptions)
  }

  buscarSabores(access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
      })
    };

    return this.http.get(this.baseApiPath + "/sabor", httpOptions)
  }

  buscarClientes() {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    return this.http.get(this.baseApiPath + "/cliente", httpOptions)
  }

  buscarCliente(access_token: string, codigo: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
      })
    };

    return this.http.get(this.baseApiPath + "/cliente/" + codigo, httpOptions)
  }

  finalizarPedidos(body: number, access_token: string, codigo: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.baseApiPath + "/pedido/" + codigo + "/status", body, httpOptions);
  }
}
