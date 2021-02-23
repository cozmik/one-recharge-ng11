import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworksConfigurationComponent } from './networks-configuration.component';

describe('NetworksConfigurationComponent', () => {
  let component: NetworksConfigurationComponent;
  let fixture: ComponentFixture<NetworksConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworksConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworksConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
