import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 /* {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },*/
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'total-visit',
    loadChildren: () => import('./total-visit/total-visit.module').then( m => m.TotalVisitPageModule)
  },
  {
    path: 'post-operatorio',
    loadChildren: () => import('./post-operatorio/post-operatorio.module').then( m => m.PostOperatorioPageModule)
  },
  {
    path: 'follow-up',
    loadChildren: () => import('./follow-up/follow-up.module').then( m => m.FollowUpPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
