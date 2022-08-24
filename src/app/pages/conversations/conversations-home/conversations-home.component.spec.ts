import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsHomeComponent } from './conversations-home.component';

describe('ConversationsHomeComponent', () => {
  let component: ConversationsHomeComponent;
  let fixture: ComponentFixture<ConversationsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
