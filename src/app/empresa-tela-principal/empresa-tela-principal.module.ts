import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaTelaPrincipalPage } from './empresa-tela-principal.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaTelaPrincipalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpresaTelaPrincipalPage]
})
export class EmpresaTelaPrincipalPageModule {}
