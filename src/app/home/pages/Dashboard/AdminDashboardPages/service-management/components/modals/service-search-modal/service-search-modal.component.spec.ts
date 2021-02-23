import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSearchModalComponent } from './service-search-modal.component';

describe('ServiceSearchModalComponent', () => {
  let component: ServiceSearchModalComponent;
  let fixture: ComponentFixture<ServiceSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSearchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
