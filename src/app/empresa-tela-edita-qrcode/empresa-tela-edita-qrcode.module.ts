import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaTelaEditaQrcodePage } from './empresa-tela-edita-qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaTelaEditaQrcodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [EmpresaTelaEditaQrcodePage]
})
export class EmpresaTelaEditaQrcodePageModule {}
