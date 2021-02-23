import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionAccountsComponent } from './commission-accounts.component';

describe('CommissionAccountsComponent', () => {
  let component: CommissionAccountsComponent;
  let fixture: ComponentFixture<CommissionAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
