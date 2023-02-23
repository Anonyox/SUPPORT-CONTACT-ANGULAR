import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentCpfComponent } from './dialog-document-cpf.component';

describe('DialogDocumentCpfComponent', () => {
  let component: DialogDocumentCpfComponent;
  let fixture: ComponentFixture<DialogDocumentCpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentCpfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
