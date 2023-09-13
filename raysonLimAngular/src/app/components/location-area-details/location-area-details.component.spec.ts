import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAreaDetailsComponent } from './location-area-details.component';

describe('LocationAreaDetailsComponent', () => {
  let component: LocationAreaDetailsComponent;
  let fixture: ComponentFixture<LocationAreaDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationAreaDetailsComponent]
    });
    fixture = TestBed.createComponent(LocationAreaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
