import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyDetailsPageRoutingModule } from './property-details-routing.module';

import { PropertyDetailsPage } from './property-details.page';
import { SharedModule } from 'src/app/share.module';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyDetailsPageRoutingModule,
    SharedModule,
    OwlModule
  ],
  declarations: [PropertyDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyDetailsPageModule { }
