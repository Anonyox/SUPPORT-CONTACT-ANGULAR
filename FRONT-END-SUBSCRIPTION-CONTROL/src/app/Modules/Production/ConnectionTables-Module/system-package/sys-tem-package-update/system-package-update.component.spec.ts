import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysTemPackageUpdateComponent } from './system-package-update.component';

describe('SysTemPackageUpdateComponent', () => {
  let component: SysTemPackageUpdateComponent;
  let fixture: ComponentFixture<SysTemPackageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysTemPackageUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysTemPackageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
