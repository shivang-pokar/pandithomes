import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params } from '@angular/router';
import { CrudServiceService, User, AlertService } from '@realestate/services';
import { UiService } from '@realestate/ui';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage implements OnInit {
  user$: any;
  property$: any;
  propertyData;
  imageObject: Array<any>;
  propertyCollName: string = 'property';
  usersCollName: string = 'users';
  id: string;
  authState;
  email;
  phone;
  constructor(
    private activatedRoute: ActivatedRoute,
    public crudServiceService: CrudServiceService,
    private angularFireAuth: AngularFireAuth,
    private uiService: UiService,
    private alertService: AlertService,
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(authState => {
      this.authState = authState;
    })

    this.property$ = this.crudServiceService.collection$(this.propertyCollName, qry => qry.where('id', '==', this.id)).subscribe(resp => {
      if (resp[0]) {
        this.propertyData = resp[0]
        this.imageObject = this.propertyData.attachments;
      }
    });
  }

  getEmailPhone() {
    if (this.authState) {
      let createdBy = this.propertyData.createdBy
      this.user$ = this.crudServiceService.collection$(this.usersCollName, (qry: any) => qry.where('uid', '==', createdBy)).subscribe((res: Array<User>) => {
        this.email = res[0].email
        this.phone = res[0].phone
        this.user$.unsubscribe()
      })
    } else {
      this.uiService.loginDialog()
    }

  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave')
    this.property$.unsubscribe();
  }

}
