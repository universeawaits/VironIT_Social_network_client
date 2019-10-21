import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareContactDialogComponent } from './share-contact-dialog.component';

describe('ShareContactDialogComponent', () => {
  let component: ShareContactDialogComponent;
  let fixture: ComponentFixture<ShareContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
