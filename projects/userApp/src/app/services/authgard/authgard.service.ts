import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { UiService } from '@realestate/ui';

@Injectable({
  providedIn: 'root'
})
export class AuthgardService implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private cookieService: CookieService,
    public uiService: UiService,
  ) { }

  canActivate() {
    return this.angularFireAuth.authState.pipe(map(authState => {
      if (authState && authState.uid == this.cookieService.get('uid') && authState.providerData.findIndex(provider => provider.providerId == 'phone') != -1) {
        return true;
      }
      this.router.navigate(['']);
      this.uiService.loginDialog();
      return false;
    }))
  }
}
