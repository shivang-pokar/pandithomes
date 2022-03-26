import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../share.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OtpComponent } from './otp/otp.component';
import { ForgotPassswordComponent } from './forgot-passsword/forgot-passsword.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    OtpComponent,
    ForgotPassswordComponent
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
