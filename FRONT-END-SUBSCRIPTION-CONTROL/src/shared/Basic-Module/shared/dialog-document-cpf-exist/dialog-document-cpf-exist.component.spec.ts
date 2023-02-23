import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentCpfExistComponent } from './dialog-document-cpf-exist.component';

describe('DialogDocumentCpfExistComponent', () => {
  let component: DialogDocumentCpfExistComponent;
  let fixture: ComponentFixture<DialogDocumentCpfExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentCpfExistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentCpfExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
