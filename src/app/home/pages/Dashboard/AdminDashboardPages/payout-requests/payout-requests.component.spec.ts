import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutRequestsComponent } from './payout-requests.component';

describe('PayoutRequestsComponent', () => {
  let component: PayoutRequestsComponent;
  let fixture: ComponentFixture<PayoutRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
