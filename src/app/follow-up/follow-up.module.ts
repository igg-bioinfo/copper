import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FollowUpPageRoutingModule } from './follow-up-routing.module';

import { FollowUpPage } from './follow-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FollowUpPageRoutingModule
  ],
  declarations: [FollowUpPage]
})
export class FollowUpPageModule {}
