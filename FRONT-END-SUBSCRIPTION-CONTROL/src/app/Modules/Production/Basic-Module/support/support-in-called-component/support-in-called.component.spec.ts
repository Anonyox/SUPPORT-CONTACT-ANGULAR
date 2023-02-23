import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportInCalledComponent } from './support-in-called.component';

describe('SupportInCalledComponent', () => {
  let component: SupportInCalledComponent;
  let fixture: ComponentFixture<SupportInCalledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportInCalledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportInCalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
