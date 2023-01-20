import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostOperatorioPage } from './post-operatorio.page';

const routes: Routes = [
  {
    path: '',
    component: PostOperatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostOperatorioPageRoutingModule {}
