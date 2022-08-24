import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlesAddComponent } from './bundles-add.component';

describe('BundlesAddComponent', () => {
  let component: BundlesAddComponent;
  let fixture: ComponentFixture<BundlesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
