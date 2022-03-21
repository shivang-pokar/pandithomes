import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.page.html',
  styleUrls: ['./join-us.page.scss'],
})
export class JoinUsPage implements OnInit {

  title: string = `Join Us`
  description: string = `If you're looking to buy your dream home in we feature an extensive range of
  standalone houses, townhouses and apartments for sale. We take the time to understand your specific
  needs,
  so we
  only focus on properties that meet your criteria. No time-wasting inspections.`

  constructor() { }

  ngOnInit() {
  }

}
