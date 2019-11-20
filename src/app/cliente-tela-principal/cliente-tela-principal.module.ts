import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClienteTelaPrincipalPage } from './cliente-tela-principal.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteTelaPrincipalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClienteTelaPrincipalPage]
})
export class ClienteTelaPrincipalPageModule {}
