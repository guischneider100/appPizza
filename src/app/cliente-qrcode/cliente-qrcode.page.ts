import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-qrcode',
  templateUrl: './cliente-qrcode.page.html',
  styleUrls: ['./cliente-qrcode.page.scss'],
})
export class ClienteQrcodePage implements OnInit {

  scannedData: {};
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
    this.router.navigate(['cliente-nome']);
    /*this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData;
      })
      .catch(err => {
      });*/
  }

}
