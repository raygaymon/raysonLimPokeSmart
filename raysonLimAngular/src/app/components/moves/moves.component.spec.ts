import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesComponent } from './moves.component';

describe('MovesComponent', () => {
  let component: MovesComponent;
  let fixture: ComponentFixture<MovesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovesComponent]
    });
    fixture = TestBed.createComponent(MovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
