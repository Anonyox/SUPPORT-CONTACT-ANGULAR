import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransferingSupportCalledComponent } from './dialog-transfering-support-called.component';

describe('DialogTransferingSupportCalledComponent', () => {
  let component: DialogTransferingSupportCalledComponent;
  let fixture: ComponentFixture<DialogTransferingSupportCalledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransferingSupportCalledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransferingSupportCalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
