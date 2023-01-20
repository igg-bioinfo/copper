import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalVisitPage } from './total-visit.page';

const routes: Routes = [
  {
    path: '',
    component: TotalVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalVisitPageRoutingModule {}
