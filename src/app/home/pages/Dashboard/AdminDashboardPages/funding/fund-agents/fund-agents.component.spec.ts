import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAgentsComponent } from './fund-agents.component';

describe('FundAgentsComponent', () => {
  let component: FundAgentsComponent;
  let fixture: ComponentFixture<FundAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
