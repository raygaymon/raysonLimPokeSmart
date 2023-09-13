import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComponent } from './type.component';

describe('TypeComponent', () => {
  let component: TypeComponent;
  let fixture: ComponentFixture<TypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeComponent]
    });
    fixture = TestBed.createComponent(TypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
