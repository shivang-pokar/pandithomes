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
  constructor(
    public dialogService: UiService,
    public crudServiceService: CrudServiceService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    let uid = this.cookieService.get('uid');
    this.property$ = this.crudServiceService.collection$(this.propertyCollName, qry => qry.where('createdBy', '==', uid))
  }

  editItem(event) {
    this.dialogService.openCreateEditDialog(event)
  }

}
