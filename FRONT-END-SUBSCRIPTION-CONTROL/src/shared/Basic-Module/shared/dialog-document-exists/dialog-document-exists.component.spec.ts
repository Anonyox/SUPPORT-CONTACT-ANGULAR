import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentExistsComponent } from './dialog-document-exists.component';

describe('DialogDocumentExistsComponent', () => {
  let component: DialogDocumentExistsComponent;
  let fixture: ComponentFixture<DialogDocumentExistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentExistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
