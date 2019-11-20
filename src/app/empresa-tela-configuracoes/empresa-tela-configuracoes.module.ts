import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaTelaConfiguracoesPage } from './empresa-tela-configuracoes.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaTelaConfiguracoesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpresaTelaConfiguracoesPage]
})
export class EmpresaTelaConfiguracoesPageModule {}
