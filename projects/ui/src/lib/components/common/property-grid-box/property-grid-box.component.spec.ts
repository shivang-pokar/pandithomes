import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGridBoxComponent } from './property-grid-box.component';

describe('PropertyGridBoxComponent', () => {
  let component: PropertyGridBoxComponent;
  let fixture: ComponentFixture<PropertyGridBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyGridBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyGridBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
