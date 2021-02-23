import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickConfigModalComponent } from './quick-config-modal.component';

describe('QuickCofigModalComponent', () => {
  let component: QuickConfigModalComponent;
  let fixture: ComponentFixture<QuickConfigModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickConfigModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
