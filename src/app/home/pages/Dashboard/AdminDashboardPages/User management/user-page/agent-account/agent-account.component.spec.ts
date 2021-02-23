import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfileComponent } from './agent-account.component';

describe('AgentProfileComponent', () => {
  let component: AgentProfileComponent;
  let fixture: ComponentFixture<AgentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
