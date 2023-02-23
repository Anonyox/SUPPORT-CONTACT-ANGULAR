import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSupportDetailComponent } from './dialog-support-detail.component';

describe('DialogSupportDetailComponent', () => {
  let component: DialogSupportDetailComponent;
  let fixture: ComponentFixture<DialogSupportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSupportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSupportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
