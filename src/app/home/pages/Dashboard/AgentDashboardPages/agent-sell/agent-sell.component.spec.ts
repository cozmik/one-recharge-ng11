import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSellComponent } from './agent-sell.component';

describe('AgentSellComponent', () => {
  let component: AgentSellComponent;
  let fixture: ComponentFixture<AgentSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
