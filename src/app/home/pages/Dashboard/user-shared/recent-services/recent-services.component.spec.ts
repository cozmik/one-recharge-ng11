import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentServicesComponent } from './recent-services.component';

describe('RecentServicesComponent', () => {
  let component: RecentServicesComponent;
  let fixture: ComponentFixture<RecentServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
