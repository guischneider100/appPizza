import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaTelaQrcodePage } from './empresa-tela-qrcode.page';
import { BuscaQRCodePipe } from '../pipes/busca-qrcode.pipe';

const routes: Routes = [
  {
    path: '',
    component: EmpresaTelaQrcodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpresaTelaQrcodePage, BuscaQRCodePipe],
  exports: [BuscaQRCodePipe]
})
export class EmpresaTelaQrcodePageModule {}
