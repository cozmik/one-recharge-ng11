import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageViewModalComponent } from './package-view-modal.component';

describe('PackageViewModalComponent', () => {
  let component: PackageViewModalComponent;
  let fixture: ComponentFixture<PackageViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
