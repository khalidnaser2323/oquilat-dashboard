import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlesListComponent } from './bundles-list.component';

describe('BundlesListComponent', () => {
  let component: BundlesListComponent;
  let fixture: ComponentFixture<BundlesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
