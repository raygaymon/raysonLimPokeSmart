import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageSimulatorComponent } from './damage-simulator.component';

describe('DamageSimulatorComponent', () => {
  let component: DamageSimulatorComponent;
  let fixture: ComponentFixture<DamageSimulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DamageSimulatorComponent]
    });
    fixture = TestBed.createComponent(DamageSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
