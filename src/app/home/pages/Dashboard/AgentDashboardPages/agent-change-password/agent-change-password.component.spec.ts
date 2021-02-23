import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentChangePasswordComponent } from './agent-change-password.component';

describe('AgentChangePasswordComponent', () => {
  let component: AgentChangePasswordComponent;
  let fixture: ComponentFixture<AgentChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
