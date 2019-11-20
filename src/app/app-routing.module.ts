import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'tela-inicial', loadChildren: './tela-inicial/tela-inicial.module#TelaInicialPageModule' },
  { path: 'cliente-qrcode', loadChildren: './cliente-qrcode/cliente-qrcode.module#ClienteQrcodePageModule' },
  { path: 'cliente-nome', loadChildren: './cliente-nome/cliente-nome.module#ClienteNomePageModule' },
  { path: 'cliente-tela-principal', loadChildren: './cliente-tela-principal/cliente-tela-principal.module#ClienteTelaPrincipalPageModule' },
  { path: 'empresa-login', loadChildren: './empresa-login/empresa-login.module#EmpresaLoginPageModule' },
  { path: 'empresa-cadastro', loadChildren: './empresa-cadastro/empresa-cadastro.module#EmpresaCadastroPageModule' },
  { path: 'empresa-tela-principal', loadChildren: './empresa-tela-principal/empresa-tela-principal.module#EmpresaTelaPrincipalPageModule' },
  { path: 'empresa-tela-sabores', loadChildren: './empresa-tela-sabores/empresa-tela-sabores.module#EmpresaTelaSaboresPageModule' },
  { path: 'empresa-tela-qrcode', loadChildren: './empresa-tela-qrcode/empresa-tela-qrcode.module#EmpresaTelaQrcodePageModule' },
  { path: 'empresa-tela-configuracoes', loadChildren: './empresa-tela-configuracoes/empresa-tela-configuracoes.module#EmpresaTelaConfiguracoesPageModule' },
  { path: 'tab-sugestoes', loadChildren: './empresa-tabs-informacoes/tab-sugestoes/tab-sugestoes.module#TabSugestoesPageModule' },
  { path: 'tab-informacoes', loadChildren: './empresa-tabs-informacoes/tab-informacoes/tab-informacoes.module#TabInformacoesPageModule' },
  { path: 'empresa-tela-informacoes', loadChildren: './empresa-tabs-informacoes/empresa-tela-informacoes/empresa-tela-informacoes.module#EmpresaTelaInformacoesPageModule' },
  { path: 'empresa-tela-edita-sabores', loadChildren: './empresa-tela-edita-sabores/empresa-tela-edita-sabores.module#EmpresaTelaEditaSaboresPageModule' },
  { path: 'empresa-tela-edita-qrcode', loadChildren: './empresa-tela-edita-qrcode/empresa-tela-edita-qrcode.module#EmpresaTelaEditaQrcodePageModule' },
  { path: 'empresa-cadastro-email', loadChildren: './empresa-cadastro-email/empresa-cadastro-email.module#EmpresaCadastroEmailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
