import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabInformacoesPage } from './tab-informacoes.page';

const routes: Routes = [
  {
    path: '',
    component: TabInformacoesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabInformacoesPage]
})
export class TabInformacoesPageModule {}
