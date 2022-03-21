import { NgModule } from '@angular/core';
import { ServicesComponent } from './services.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './share.module';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    ServicesComponent,
  ],
  providers: [
    CookieService
  ],
  imports: [
    MatDialogModule,
    SharedModule,
    AngularFireAuthModule,
  ],
  exports: [
    ServicesComponent
  ]
})
export class ServicesModule { }
