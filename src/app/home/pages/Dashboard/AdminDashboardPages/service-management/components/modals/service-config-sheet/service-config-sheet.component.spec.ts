import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConfigSheetComponent } from './service-config-sheet.component';

describe('ServiceConfigSheetComponent', () => {
  let component: ServiceConfigSheetComponent;
  let fixture: ComponentFixture<ServiceConfigSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceConfigSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceConfigSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
