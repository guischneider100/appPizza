import { Injectable } from '@angular/core';

let IP_KEY_NAME = "IP";

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor() { }

  getIP(): any {
    return localStorage.getItem(IP_KEY_NAME);
  }

  setIP(ip?: string){
    localStorage.setItem(IP_KEY_NAME, "http://"+ip+":8080");
  }
}
