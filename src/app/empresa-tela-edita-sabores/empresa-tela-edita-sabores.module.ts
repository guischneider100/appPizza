import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaTelaEditaSaboresPage } from './empresa-tela-edita-sabores.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaTelaEditaSaboresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpresaTelaEditaSaboresPage]
})
export class EmpresaTelaEditaSaboresPageModule {}
