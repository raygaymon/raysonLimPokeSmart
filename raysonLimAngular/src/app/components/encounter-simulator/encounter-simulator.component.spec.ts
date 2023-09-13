import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterSimulatorComponent } from './encounter-simulator.component';

describe('EncounterSimulatorComponent', () => {
  let component: EncounterSimulatorComponent;
  let fixture: ComponentFixture<EncounterSimulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncounterSimulatorComponent]
    });
    fixture = TestBed.createComponent(EncounterSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
