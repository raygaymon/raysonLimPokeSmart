import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAreaComponent } from './location-area.component';

describe('LocationAreaComponent', () => {
  let component: LocationAreaComponent;
  let fixture: ComponentFixture<LocationAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationAreaComponent]
    });
    fixture = TestBed.createComponent(LocationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
