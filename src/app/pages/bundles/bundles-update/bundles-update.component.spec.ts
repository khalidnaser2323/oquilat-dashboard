import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlesUpdateComponent } from './bundles-update.component';

describe('BundlesUpdateComponent', () => {
  let component: BundlesUpdateComponent;
  let fixture: ComponentFixture<BundlesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
