import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPackagesComponent } from './select-package.component';

describe('SelectPackagesComponent', () => {
  let component: SelectPackagesComponent;
  let fixture: ComponentFixture<SelectPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
