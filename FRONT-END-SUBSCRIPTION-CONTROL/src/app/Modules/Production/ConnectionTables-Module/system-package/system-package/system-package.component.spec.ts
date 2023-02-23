import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPackageComponent } from './system-package.component';

describe('SystemPackageComponent', () => {
  let component: SystemPackageComponent;
  let fixture: ComponentFixture<SystemPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
