import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlesHomeComponent } from './bundles-home.component';

describe('BundlesHomeComponent', () => {
  let component: BundlesHomeComponent;
  let fixture: ComponentFixture<BundlesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
