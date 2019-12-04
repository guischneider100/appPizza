import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoSisService {

  private baseApiPath;

  constructor(public http: HttpClient,
    public ip: IpService) {
    this.baseApiPath = ip.getIP();
  }

  cadastraConfigs(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseApiPath + "/configuracao", request, httpOptions)
  }
}
