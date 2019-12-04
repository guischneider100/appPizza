import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cliente-qrcode',
  templateUrl: './cliente-qrcode.page.html',
  styleUrls: ['./cliente-qrcode.page.scss'],
})
export class ClienteQrcodePage implements OnInit {

  scannedData = {};
  arrayInfos: String[];
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private barcodeScanner: BarcodeScanner, private router: Router) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
   }

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData;
        this.arrayInfos = this.scannedData["text"].toString().split(':');

        let navigationExtras: NavigationExtras = {
          state: {
            qrCodeMesa: this.arrayInfos[0],
            qrCodeEmpresa: this.arrayInfos[1]
          }
        };
        this.router.navigate(['cliente-nome'], navigationExtras);
      })
      .catch(err => {
      });
  }

}
