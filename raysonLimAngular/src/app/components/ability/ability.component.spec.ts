import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityComponent } from './ability.component';

describe('AbilityComponent', () => {
  let component: AbilityComponent;
  let fixture: ComponentFixture<AbilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilityComponent]
    });
    fixture = TestBed.createComponent(AbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
