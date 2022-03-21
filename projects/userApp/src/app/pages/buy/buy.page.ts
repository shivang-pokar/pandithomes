import { Component, OnInit } from '@angular/core';
import { UiService } from '@realestate/ui';
import { CrudServiceService } from '@realestate/services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  propertyCollName: string = 'property';
  property$: any;
  constructor(
    public dialogService: UiService,
    public crudServiceService: CrudServiceService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    let uid = this.cookieService.get('uid');
    this.property$ = this.crudServiceService.collection$(this.propertyCollName)
  }

}
