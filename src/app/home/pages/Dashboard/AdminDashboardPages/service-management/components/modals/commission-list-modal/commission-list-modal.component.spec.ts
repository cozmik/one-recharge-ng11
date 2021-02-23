import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionListModalComponent } from './commission-list-modal.component';

describe('CommissionListModalComponent', () => {
  let component: CommissionListModalComponent;
  let fixture: ComponentFixture<CommissionListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
