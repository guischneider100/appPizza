import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  private baseApiPath;

  constructor(public http: HttpClient,
    public ip: IpService) { this.baseApiPath = ip.getIP();  }

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
