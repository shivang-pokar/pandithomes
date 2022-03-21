import { NgModule } from '@angular/core';
import { ServicesModule } from '@realestate/services';

import { BannerComponent } from './components/banner/banner.component';
import { SharedModule } from './share.module';
import { UiComponent } from './ui.component';



@NgModule({
  declarations: [
    UiComponent,
    BannerComponent
  ],
  imports: [
    SharedModule,

  ],
  exports: [
    UiComponent,
    BannerComponent
  ],
  providers: [
    
  ]
})
export class UiModule { }
