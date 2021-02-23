import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTransactionHistoryComponent } from './agent-transaction-history.component';

describe('AgentTransactionHistoryComponent', () => {
  let component: AgentTransactionHistoryComponent;
  let fixture: ComponentFixture<AgentTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
