import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyPageRoutingModule } from './buy-routing.module';

import { BuyPage } from './buy.page';
import { SharedModule } from 'src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyPageRoutingModule,
    SharedModule
  ],
  declarations: [BuyPage]
})
export class BuyPageModule {}
