import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, User } from '@realestate/services';
import { CookieService } from 'ngx-cookie-service';
import { UiService } from '../../../ui.service';
import { LoginComponent } from '../../auth/login/login.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: User = new User();
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    public cookieService: CookieService,
    public uiService: UiService,
  ) { }

  ngOnInit(): void {
    let userDat: any = window.localStorage.getItem('user')
    this.userData = JSON.parse(userDat);
    this.cookieService.get('uid')
  }

  loginDialog() {
    this.uiService.loginDialog();
  }

  signUp() {
    this.uiService.signUp();
  }

  logOut() {
    let dialogRef = this.uiService.openConfirmAlert()
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.authService.logOut();
      }
    })
  }

  checkAccess() {
    if (this.userData && this.userData.uid && this.cookieService.get('uid') == this.userData.uid) {
      return true
    }
    return false
  }

}
