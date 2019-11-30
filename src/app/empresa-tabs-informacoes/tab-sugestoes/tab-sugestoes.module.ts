import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabSugestoesPage } from './tab-sugestoes.page';
import { BuscaSugestaoPipe } from 'src/app/pipes/busca-sugestao.pipe';

const routes: Routes = [
  {
    path: '',
    component: TabSugestoesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabSugestoesPage, BuscaSugestaoPipe],
  exports: [BuscaSugestaoPipe]
})
export class TabSugestoesPageModule {}
