import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../share.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OtpComponent } from './otp/otp.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
    OtpComponent
  ]
})
export class AuthModule { }
