import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFundRequestHistoryComponent } from './agent-fund-request-history.component';

describe('AgentFundRequestHistoryComponent', () => {
  let component: AgentFundRequestHistoryComponent;
  let fixture: ComponentFixture<AgentFundRequestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentFundRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentFundRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
