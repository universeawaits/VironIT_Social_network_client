import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationSpaceComponent } from './conversation-space.component';

describe('ConversationSpaceComponent', () => {
  let component: ConversationSpaceComponent;
  let fixture: ComponentFixture<ConversationSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
