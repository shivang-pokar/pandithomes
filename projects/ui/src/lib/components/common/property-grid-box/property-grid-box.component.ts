import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-property-grid-box',
  templateUrl: './property-grid-box.component.html',
  styleUrls: ['./property-grid-box.component.scss']
})
export class PropertyGridBoxComponent implements OnInit {

  @Input() propertyData: any;
  @Output() editItem = new EventEmitter();
  @Input() showEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.propertyData)
  }

  edit() {
    this.editItem.emit(this.propertyData);
  }

}
