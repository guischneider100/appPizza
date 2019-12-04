import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private baseApiPath;

  constructor(public http: HttpClient,
    public ip: IpService) {
    this.baseApiPath = ip.getIP();
  }

  cadastraEmpresa(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseApiPath + "/empresa", request, httpOptions)
  }

  cadastraUsuario(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseApiPath + "/usuario", request, httpOptions)
  }
}
