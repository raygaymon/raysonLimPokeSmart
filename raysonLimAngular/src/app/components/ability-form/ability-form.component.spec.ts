import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityFormComponent } from './ability-form.component';

describe('AbilityFormComponent', () => {
  let component: AbilityFormComponent;
  let fixture: ComponentFixture<AbilityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilityFormComponent]
    });
    fixture = TestBed.createComponent(AbilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
