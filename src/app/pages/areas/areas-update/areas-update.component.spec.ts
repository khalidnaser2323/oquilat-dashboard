import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasUpdateComponent } from './areas-update.component';

describe('AreasUpdateComponent', () => {
  let component: AreasUpdateComponent;
  let fixture: ComponentFixture<AreasUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
