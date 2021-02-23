import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrozenAccountsComponent } from './frozen-accounts.component';

describe('FrozenAccountsComponent', () => {
  let component: FrozenAccountsComponent;
  let fixture: ComponentFixture<FrozenAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrozenAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrozenAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
