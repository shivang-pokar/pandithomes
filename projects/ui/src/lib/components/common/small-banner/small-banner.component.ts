import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-small-banner',
  templateUrl: './small-banner.component.html',
  styleUrls: ['./small-banner.component.scss']
})
export class SmallBannerComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
