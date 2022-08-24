import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsHomeComponent } from './complaints-home.component';

describe('ComplaintsHomeComponent', () => {
  let component: ComplaintsHomeComponent;
  let fixture: ComponentFixture<ComplaintsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
