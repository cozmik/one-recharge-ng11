import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestServiceFormComponent } from './guest-service-form.component';

describe('GuestServiceFormComponent', () => {
  let component: GuestServiceFormComponent;
  let fixture: ComponentFixture<GuestServiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestServiceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
