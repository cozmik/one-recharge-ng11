import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDataComponent } from './guest-data.component';

describe('GuestDataComponent', () => {
  let component: GuestDataComponent;
  let fixture: ComponentFixture<GuestDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
