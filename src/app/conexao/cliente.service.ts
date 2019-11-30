import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseApiPath = "http://192.168.0.106:8080";

  constructor(public http: HttpClient) { }

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
