import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService, AuthService, User } from '@realestate/services';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UiService } from '../../../ui.service';

@Component({
  selector: 'ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private cookieService: CookieService,
    private uiService: UiService,
  ) {
    this.login = this.formBuilder.group({
      usernameOrEmail: ['', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {

  }

  signUp() {
    this.dialogRef.close({
      signup: true
    })
  }

  async signIn() {
    if (this.login.valid) {
      try {
        const login: any = await this.authService.signIn(this.login.value.usernameOrEmail, this.login.value.password);

        if (!login.phone || !login.verify) {
          this.uiService.otp(login);
        } else {
          this.uiService.setuserDataAndReald(login);
        }
        console.log(login)
        this.login.reset();
        this.dialogRef.close();
      }
      catch (e: any) {
        this.alertService.error(e.message);
      }
    }
  }

  async signInGoogle() {
    try {
      const login: any = await this.authService.signInGoogle();
      console.log(login)
      if (!login.phone || !login.verify) {
        this.dialogRef.close();
        this.uiService.otp(login);
      } else {
        this.uiService.setuserDataAndReald(login);
      }
    }
    catch (e: any) {
      console.log(e)
    }

  }

}
