import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoSisService {

  private baseApiPath = "http://192.168.0.106:8080";

  constructor(public http: HttpClient) { }

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
