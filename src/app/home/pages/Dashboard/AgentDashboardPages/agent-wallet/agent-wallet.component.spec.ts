import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWalletComponent } from './agent-wallet.component';

describe('AgentWalletComponent', () => {
  let component: AgentWalletComponent;
  let fixture: ComponentFixture<AgentWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
