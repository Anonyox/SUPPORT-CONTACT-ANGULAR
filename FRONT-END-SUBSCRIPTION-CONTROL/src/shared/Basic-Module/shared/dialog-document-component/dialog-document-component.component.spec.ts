import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentComponentComponent } from './dialog-document-component.component';

describe('DialogDocumentComponentComponent', () => {
  let component: DialogDocumentComponentComponent;
  let fixture: ComponentFixture<DialogDocumentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
