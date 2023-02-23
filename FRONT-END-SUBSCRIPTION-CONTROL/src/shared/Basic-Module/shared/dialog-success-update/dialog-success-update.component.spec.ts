import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccessUpdateComponent } from './dialog-success-update.component';

describe('DialogSuccessUpdateComponent', () => {
  let component: DialogSuccessUpdateComponent;
  let fixture: ComponentFixture<DialogSuccessUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSuccessUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccessUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
