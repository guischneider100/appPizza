import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseApiPath;

  constructor(public http: HttpClient,
    public ip: IpService) { 
    this.baseApiPath = ip.getIP();
  }

  cadastarCliente(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseApiPath + "/cliente", request, httpOptions)
  }
}
