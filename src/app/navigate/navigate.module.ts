import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigatePage } from './navigate.page';

import { NavigatePageRoutingModule } from './navigate-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavigatePageRoutingModule
  ],
  declarations: [NavigatePage]
})
export class NavigatePageModule {}
