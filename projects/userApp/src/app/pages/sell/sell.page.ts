import { Component, OnInit } from '@angular/core';
import { UiService } from '@realestate/ui';
import { CrudServiceService } from '@realestate/services';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  propertyCollName: string = 'property';
  property$: any;

  title: string = `It’s Time To Buy…`;
  description: string = `Find the heavenly property from Pandit Home Properties and buy it before anyone else!
  Don’t miss the chance of buying the desired property at the best rates possible. Pandit
  homes have got properties for everyone, find the one you’ll love!`;

  constructor(
    public dialogService: UiService,
    public crudServiceService: CrudServiceService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    let uid = this.cookieService.get('uid');
    this.property$ = this.crudServiceService.collection$(this.propertyCollName, qry => qry.orderBy('updatedAt', 'desc').where("deleteFlag", "==", "N").where('createdBy', '==', uid))
  }

  editItem(event) {
    this.dialogService.openCreateEditDialog(event)
  }

}
