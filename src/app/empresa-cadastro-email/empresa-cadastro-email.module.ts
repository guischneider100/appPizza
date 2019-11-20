import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmpresaCadastroEmailPage } from './empresa-cadastro-email.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaCadastroEmailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpresaCadastroEmailPage]
})
export class EmpresaCadastroEmailPageModule {}
