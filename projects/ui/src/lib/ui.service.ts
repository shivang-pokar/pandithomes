import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../lib/components/auth/sign-up/sign-up.component';
import { OtpComponent } from '../lib/components/auth/otp/otp.component';
import { LoginComponent } from '../lib/components/auth/login/login.component';
import { CreateEditComponent } from '../lib/components/common/create-edit/create-edit.component';
import { AlertDialogComponent } from '../lib/components/common/alert-dialog/alert-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { User, AlertService } from '@realestate/services';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private cookieService: CookieService,

  ) { }

  openConfirmAlert() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '450px',
    });
    return dialogRef;
  }

  public openCreateEditDialog(propertyData?: any) {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      width: '950px',
      data: propertyData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  loginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '550px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.signup) {
        this.signUp();
      }
    });

  }

  otp(userData: any) {
    const dialogRef = this.dialog.open(OtpComponent, {
      width: '550px',
      data: userData
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  signUp() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '550px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.login) {
        this.loginDialog();
      }
    });
  }


  setuserDataAndReald(userData: User) {
    this.alertService.success('User created successfully');
    let uid: string = userData.uid || '';
    this.cookieService.set('uid', uid);
    window.localStorage.setItem('user', JSON.stringify(userData));
    window.location.reload()
  }

}
