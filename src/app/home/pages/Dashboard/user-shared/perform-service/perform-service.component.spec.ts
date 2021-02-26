import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformServiceComponent } from './perform-service.component';

describe('PerformServiceComponent', () => {
  let component: PerformServiceComponent;
  let fixture: ComponentFixture<PerformServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
