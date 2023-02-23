import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCreateComponent } from './system-create.component';

describe('SystemCreateComponent', () => {
  let component: SystemCreateComponent;
  let fixture: ComponentFixture<SystemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
