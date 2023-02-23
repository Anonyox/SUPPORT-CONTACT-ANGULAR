import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysTemPackageCreateComponent } from './system-package-create.component';

describe('SysTemPackageCreateComponent', () => {
  let component: SysTemPackageCreateComponent;
  let fixture: ComponentFixture<SysTemPackageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysTemPackageCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysTemPackageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
