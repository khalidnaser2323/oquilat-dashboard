import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPrintComponent } from './orders-print.component';

describe('OrdersPrintComponent', () => {
  let component: OrdersPrintComponent;
  let fixture: ComponentFixture<OrdersPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
