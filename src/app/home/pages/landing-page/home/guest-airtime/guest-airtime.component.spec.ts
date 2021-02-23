import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAirtimeComponent } from './guest-airtime.component';

describe('GuestAirtimeComponent', () => {
  let component: GuestAirtimeComponent;
  let fixture: ComponentFixture<GuestAirtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestAirtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestAirtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
