import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNewFundRequestComponent } from './agent-new-fund-request.component';

describe('AgentNewFundRequestComponent', () => {
  let component: AgentNewFundRequestComponent;
  let fixture: ComponentFixture<AgentNewFundRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentNewFundRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNewFundRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
