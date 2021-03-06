import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrMaskerModule } from 'br-mask';

import { IonicModule } from '@ionic/angular';

import { EmpresaCadastroPage } from './empresa-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaCadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    BrMaskerModule
  ],
  declarations: [EmpresaCadastroPage]
})
export class EmpresaCadastroPageModule {}
