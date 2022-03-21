import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService, AuthService, CrudServiceService } from '@realestate/services';
import { UiService } from '../../../ui.service';

@Component({
  selector: 'ui-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  number: any;
  otp: any;
  recaptchaVerifier: any;
  verificationId: any;
  counteryCode = '+91';
  constructor(
    public authService: AuthService,
    public alertService: AlertService,
    public crudServiceService: CrudServiceService,
    public uiService: UiService,
    public dialogRef: MatDialogRef<OtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.recaptchaVerifier = this.authService.captch();
  }

  async mobileVerification() {
    try {
      this.verificationId = await this.authService.signInWithPhoneNumber(this.counteryCode + '' + this.number, this.recaptchaVerifier);
    } catch (e: any) {
      this.alertService.error(e.message)
    }
  }

  async verifyOtp() {
    try {
      const verifyOtp = await this.authService.verifyOtp(this.otp, this.verificationId.verificationId)
      this.data.verify = true;
      this.data.phone = this.counteryCode + '' + this.number;
      const user: any = await this.crudServiceService.updateWithCollNamer('users', this.data, this.data.id);
      this.uiService.setuserDataAndReald(this.data);
    }
    catch (e: any) {
      this.alertService.error(e.messages);
    }

  }

  resentOTP() {
    this.mobileVerification()
  }

}
