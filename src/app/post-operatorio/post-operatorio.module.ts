import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostOperatorioPageRoutingModule } from './post-operatorio-routing.module';

import { PostOperatorioPage } from './post-operatorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PostOperatorioPageRoutingModule
  ],
  declarations: [PostOperatorioPage]
})
export class PostOperatorioPageModule {}
