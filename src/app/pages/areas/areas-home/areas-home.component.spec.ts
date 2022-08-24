import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasHomeComponent } from './areas-home.component';

describe('AreasHomeComponent', () => {
  let component: AreasHomeComponent;
  let fixture: ComponentFixture<AreasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
