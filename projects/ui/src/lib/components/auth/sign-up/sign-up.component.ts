import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService, AuthService, User } from '@realestate/services';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UiService } from '../../../ui.service';


@Component({
  selector: 'ui-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  login: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private uiService: UiService,
  ) {

    this.login = this.formBuilder.group({
      fullName: ['', Validators.compose([Validators.required])],
      usernameOrEmail: ['', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit(): void {
  }

  openLogin() {
    this.dialogRef.close({
      login: true
    })
  }

  async signUp() {
    let user = new User();
    user.email = this.login.value.usernameOrEmail;
    user.password = this.login.value.password;
    user.fullName = this.login.value.fullName;
    let userData = await this.authService.createUser(user)

    if (!userData.phone || !userData.verify) {
      this.dialogRef.close();
      this.uiService.otp(userData);
    } else {
      this.uiService.setuserDataAndReald(userData);
    }
  }

}
