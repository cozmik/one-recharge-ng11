import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSavedWarningComponent } from './not-saved-warning.component';

describe('NotSavedWarningComponent', () => {
  let component: NotSavedWarningComponent;
  let fixture: ComponentFixture<NotSavedWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSavedWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSavedWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
