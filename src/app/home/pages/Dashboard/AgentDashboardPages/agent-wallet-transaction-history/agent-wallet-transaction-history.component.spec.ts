import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWalletTransactionHistoryComponent } from './agent-wallet-transaction-history.component';

describe('AgentWalletTransactionHistoryComponent', () => {
  let component: AgentWalletTransactionHistoryComponent;
  let fixture: ComponentFixture<AgentWalletTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentWalletTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWalletTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
