import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasAddComponent } from './areas-add.component';

describe('AreasAddComponent', () => {
  let component: AreasAddComponent;
  let fixture: ComponentFixture<AreasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
