import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadPage } from './upload.page';

import { UploadPageRoutingModule } from './upload-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UploadPageRoutingModule
  ],
  declarations: [UploadPage]
})
export class UploadPageModule {}
