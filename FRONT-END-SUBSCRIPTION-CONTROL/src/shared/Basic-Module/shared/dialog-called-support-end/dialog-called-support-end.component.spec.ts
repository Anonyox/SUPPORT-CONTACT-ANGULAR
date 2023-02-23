import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCalledSupportEndComponent } from './dialog-called-support-end.component';

describe('DialogCalledSupportEndComponent', () => {
  let component: DialogCalledSupportEndComponent;
  let fixture: ComponentFixture<DialogCalledSupportEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCalledSupportEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCalledSupportEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
