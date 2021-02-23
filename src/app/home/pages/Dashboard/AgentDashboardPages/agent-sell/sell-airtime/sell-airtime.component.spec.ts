import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellAirtimeComponent } from './sell-airtime.component';

describe('SellAirtimeComponent', () => {
  let component: SellAirtimeComponent;
  let fixture: ComponentFixture<SellAirtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellAirtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellAirtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
