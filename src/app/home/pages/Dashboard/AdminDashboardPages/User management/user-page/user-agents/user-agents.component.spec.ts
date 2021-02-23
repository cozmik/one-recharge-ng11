import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgentsComponent } from './user-agents.component';

describe('UserAgentsComponent', () => {
  let component: UserAgentsComponent;
  let fixture: ComponentFixture<UserAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
