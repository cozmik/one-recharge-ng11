import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAgentComponent } from './quick-funding.component';

describe('FundAgentComponent', () => {
  let component: FundAgentComponent;
  let fixture: ComponentFixture<FundAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
