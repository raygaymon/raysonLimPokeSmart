import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPopupComponent } from './forum-popup.component';

describe('ForumPopupComponent', () => {
  let component: ForumPopupComponent;
  let fixture: ComponentFixture<ForumPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumPopupComponent]
    });
    fixture = TestBed.createComponent(ForumPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
