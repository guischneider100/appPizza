import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaTelaInformacoesPage } from './empresa-tela-informacoes.page';

const routes: Routes = [
  {
    path: 'listar',
    component: EmpresaTelaInformacoesPage,
    children: [
      {
        path: 'listarSug',
        loadChildren: '../tab-sugestoes/tab-sugestoes.module#TabSugestoesPageModule'
      },
      {
        path: 'listarInfo',
        loadChildren: '../tab-informacoes/tab-informacoes.module#TabInformacoesPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'listar/listarSug',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpresaTelaInformacoesPage]
})
export class EmpresaTelaInformacoesPageModule {}
