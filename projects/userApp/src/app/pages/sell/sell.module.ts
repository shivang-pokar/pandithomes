import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellPageRoutingModule } from './sell-routing.module';

import { SellPage } from './sell.page';
import { SharedModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellPageRoutingModule,
    SharedModule
  ],
  declarations: [SellPage]
})
export class SellPageModule {}
