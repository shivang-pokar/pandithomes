import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '@realestate/services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  propertyCollName: string = 'property';
  property$: any;
  constructor(
    public crudServiceService: CrudServiceService,
  ) { }

  ngOnInit() {
    this.property$ = this.crudServiceService.collection$(this.propertyCollName, qry => qry.limit(3))
  }



}
