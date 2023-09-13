import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveFormComponent } from './move-form.component';

describe('MoveFormComponent', () => {
  let component: MoveFormComponent;
  let fixture: ComponentFixture<MoveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveFormComponent]
    });
    fixture = TestBed.createComponent(MoveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
