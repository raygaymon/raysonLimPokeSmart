import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityListComponent } from './ability-list.component';

describe('AbilityListComponent', () => {
  let component: AbilityListComponent;
  let fixture: ComponentFixture<AbilityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilityListComponent]
    });
    fixture = TestBed.createComponent(AbilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
