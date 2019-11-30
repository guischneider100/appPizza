import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaTelaSaboresPage } from './empresa-tela-sabores.page';
import { BuscaSaborSaboresPipe } from '../pipes/busca-sabor-sabores.pipe';

const routes: Routes = [
  {
    path: '',
    component: EmpresaTelaSaboresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpresaTelaSaboresPage, BuscaSaborSaboresPipe],
  exports: [BuscaSaborSaboresPipe]
})
export class EmpresaTelaSaboresPageModule {}
