import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  private baseApiPath = "http://192.168.0.106:8080";

  constructor(public http: HttpClient) { }

  buscarQRCodes(access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
      })
    };

    return this.http.get(this.baseApiPath + "/qr_code", httpOptions)
  }

  cadastraQRcode(request: any, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseApiPath + "/qr_code", request, httpOptions)
  }

  excluirQRCode(codigo: number, access_token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
      })
    };

    return this.http.delete(this.baseApiPath + "/qr_code/" + codigo, httpOptions)
  }
}
