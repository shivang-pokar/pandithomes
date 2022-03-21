import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../../share.module';
import { PropertyGridBoxComponent } from './property-grid-box/property-grid-box.component';
import { FooterComponent } from './footer/footer.component';
import { SmallBannerComponent } from './small-banner/small-banner.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PropertyGridBoxComponent,
    FooterComponent,
    SmallBannerComponent,
    CreateEditComponent,
    AlertDialogComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    PropertyGridBoxComponent,
    FooterComponent,
    SmallBannerComponent,
    CreateEditComponent,
    AlertDialogComponent,
    LoadingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommonPageModule { }
