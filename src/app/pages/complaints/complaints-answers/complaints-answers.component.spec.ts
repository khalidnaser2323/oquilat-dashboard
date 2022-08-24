import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsAnswersComponent } from './complaints-answers.component';

describe('ComplaintsAnswersComponent', () => {
  let component: ComplaintsAnswersComponent;
  let fixture: ComponentFixture<ComplaintsAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
