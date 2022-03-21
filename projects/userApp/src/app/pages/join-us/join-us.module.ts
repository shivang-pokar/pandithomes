import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinUsPageRoutingModule } from './join-us-routing.module';

import { JoinUsPage } from './join-us.page';
import { SharedModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinUsPageRoutingModule,
    SharedModule
  ],
  declarations: [JoinUsPage]
})
export class JoinUsPageModule {}
