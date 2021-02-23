import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDataHistoryComponent } from './agent-data-history.component';

describe('AgentDataHistoryComponent', () => {
  let component: AgentDataHistoryComponent;
  let fixture: ComponentFixture<AgentDataHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDataHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDataHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
