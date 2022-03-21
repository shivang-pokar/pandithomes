import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertService } from '../alert/alert.service';
import { CrudServiceService } from '../crudService/crud-service.service';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';
import { getAuth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, PhoneAuthProvider, linkWithCredential } from "firebase/auth";

import * as firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCollection: string = 'users';
  auth: any;
  firebase = firebase.default;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private crudService: CrudServiceService,
    private alertService: AlertService,
    private cookieService: CookieService,
    /* private uiService: UiService, */
  ) {

    initializeApp({
      apiKey: "AIzaSyCzuTRiT9vICp-lpPSupk3Xh0X410tItvo",
      authDomain: "pandithomes-f687d.firebaseapp.com",
      projectId: "pandithomes-f687d",
      storageBucket: "pandithomes-f687d.appspot.com",
      messagingSenderId: "488804788537",
      appId: "1:488804788537:web:6e9d062b83a8193cfae0e8",
      measurementId: "G-EW749H0BDH"
    });

  }


  public createUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(user.email as string, user?.password as string).then(async (res: any) => {
        let createUser: User = new User();
        createUser.uid = res.user.uid;
        createUser.fullName = user.fullName;
        createUser.email = user.email;

        try {
          let userResp = await this.storeUserInFireStore(createUser);
          resolve(createUser);
        }
        catch (e: any) {
          resolve(e);
          this.alertService.error(e.message);
        }

      }).catch(error => {
        this.alertService.error(error.message);
        reject(error);
      });
    })
  }

  public signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(resp => {
        this.crudService.collection$(this.userCollection, (qry: any) => qry.where('uid', '==', resp.user?.uid)).subscribe((user: any) => {
          if (user && user[0]) {
            resolve(user[0])
          } else {
            resolve(user)
          }
        }, er => {
          reject(er);
        });
      }).catch(error => {
        reject(error);
      });
    });
  }

  signInGoogle() {
    return new Promise(async (resolve, reject) => {
      const auth = getAuth();
      let provider = new GoogleAuthProvider()
      let resp = await signInWithPopup(auth, provider)
      let createUser: User = new User();
      createUser.uid = resp.user.uid;
      createUser.fullName = resp.user.displayName || '';
      createUser.email = resp.user.email || '';
      try {
        this.crudService.collection$(this.userCollection, (qry: any) => qry.where('uid', '==', resp.user?.uid)).subscribe(async (user: any) => {
          if (user[0]) {
            resolve(user[0])
          } else {
            let userResp = await this.storeUserInFireStore(createUser);
            resolve(createUser)
          }
        });
      }
      catch (e: any) {
        reject(e);
        this.alertService.error(e.message);
      }
    });
  }

  private storeUserInFireStore(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      var userData = JSON.parse(JSON.stringify(user));
      this.crudService.addWithCollName(this.userCollection, userData, userData.uid).then(usersRes => {
        this.alertService.success('Registration successfully completed');
        resolve(usersRes);
      }).catch(er => {
        this.alertService.error(er.message)
        reject(er);
      })
    });
  }

  logOut() {
    this.angularFireAuth.signOut().then(() => {
      this.cookieService.deleteAll();
      window.localStorage.clear();
      window.location.reload();
    })

  }

  signInWithPhoneNumber(number: any, recaptchaVerifier: any) {
    /* const auth = getAuth();
    const provider = new PhoneAuthProvider(auth);
    provider.verifyPhoneNumber(number, recaptchaVerifier) */
    return this.angularFireAuth.signInWithPhoneNumber(number, recaptchaVerifier)
  }

  verifyOtp(otp: any, verificationId: any) {
    var credential = PhoneAuthProvider.credential(verificationId, otp);
    const auth: any = getAuth();
    return linkWithCredential(auth.currentUser, credential)
  }

  captch() {
    const auth = getAuth();
    return new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response: any) => {
        /* console.log(response) */
      }
    }, auth)

  }
}
