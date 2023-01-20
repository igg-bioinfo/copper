import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalVisitPageRoutingModule } from './total-visit-routing.module';

import { TotalVisitPage } from './total-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalVisitPageRoutingModule
  ],
  declarations: [TotalVisitPage]
})
export class TotalVisitPageModule {}
