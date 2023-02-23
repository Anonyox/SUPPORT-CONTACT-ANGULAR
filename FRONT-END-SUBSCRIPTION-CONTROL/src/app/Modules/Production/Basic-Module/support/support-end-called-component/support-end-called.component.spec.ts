import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportEndCalledComponent } from './support-end-called.component';

describe('SupportEndCalledComponent', () => {
  let component: SupportEndCalledComponent;
  let fixture: ComponentFixture<SupportEndCalledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportEndCalledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportEndCalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
